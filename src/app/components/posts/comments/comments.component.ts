import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '@app/graphql-types';

const fragment = gql`
  fragment PostName on Post {
    title
  }
`;

const query = gql`
  query PostComments($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
        body
        author {
          id
          name
        }
      }
    }
  }
`;

type Response = {
  post: Post;
}

type Variables = {
  postId: number;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  readonly post = this.apollo.getClient()
    .readFragment<Post>({
      id: 'Post:' + this.data, // configured with `dataIdFromObject`
      fragment
    });

  readonly query$ = this.apollo
    .watchQuery<Response, Variables>({
      query, returnPartialData: true, variables: { postId: this.data }
    })
    .valueChanges;

  constructor(
    private readonly apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) readonly data: number,
  ) { }

  ngOnInit() {
  }

}
