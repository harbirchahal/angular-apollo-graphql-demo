import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { Post } from '@app/graphql-types';

const fragment = gql`
  fragment Post on Post {
    id
    title
    body
    author {
      id
    }
  }
`;

const mutation = gql`
  mutation UpdatePost($postId: ID!, $data: PostUpdateInput!) {
    updatePost(postId: $postId, data: $data) {
      id
      title
      body
    }
  }
`;

type Response = {
  updatePost: Post;
};

type Variables = {
  postId: number;
  data: {
    userId: number;
    title: string;
    body: string;
  }
};

@Component({
  selector: 'update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  readonly post = this.apollo.getClient()
    .readFragment<Post>({
      id: 'Post:' + this.data, // configured with `dataIdFromObject`
      fragment
    });

  readonly postForm = this.formBuilder.group({
    title: [this.post.title, Validators.required],
    body: [this.post.body, Validators.required]
  });

  constructor(
    private readonly apollo: Apollo,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialogRef<UpdatePostComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: number,
  ) {}

  ngOnInit() {
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }
    const data = { userId: +this.post.author.id, ...this.postForm.value };
    this.apollo.mutate<Response, Variables>({
      mutation, variables: { postId: this.post.id, data }
    })
    .subscribe((result) => {
      this.dialog.close();
    }, (error: ApolloError) => {
      console.error(`[UpdatePostComponent] ID: ${this.post.id}`, error);
    });
  }

}
