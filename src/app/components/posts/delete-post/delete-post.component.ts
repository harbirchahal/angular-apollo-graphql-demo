import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { switchMap } from 'rxjs/operators';
import { ConfirmComponent } from '@app/ui-components';
import { hasConfirmation } from '@app/util/operators';
import { Post } from '@app/graphql-types';

const mutation = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

const query = gql`
  query AllPosts {
    posts {
      id
    }
  }
`;

type Response = {
  deletePost: Post;
};

type Variables = {
  postId: number;
};

type Data = {
  posts: Post[]
};

@Component({
  selector: 'delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  @Input() post: Post;

  constructor(
    private readonly apollo: Apollo,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  confim() {
    this.dialog.open(ConfirmComponent, {
      height: 'auto',
      width: '400px',
      data: this.post.title
    })
      .afterClosed().pipe(
        hasConfirmation,
        switchMap(() => this.apollo.mutate<Response, Variables>({
          mutation, variables: { postId: this.post.id },
          update: (store, { data: { deletePost } }) => {
            const data = store.readQuery<Data>({ query });
            data.posts = data.posts.filter(p => p.id !== deletePost.id);
            store.writeQuery<Data>({ query, data });
          }
        })),
      )
      .subscribe((result) => {
      }, (error: ApolloError) => {
        console.error(`[DeletePostComponent] ID: ${this.post.id}`, error);
      });
  }

}
