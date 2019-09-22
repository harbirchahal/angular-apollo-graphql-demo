import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfirmComponent } from '@app/ui-components';
import { filter, switchMap } from 'rxjs/operators';
import { Post } from '@app/graphql-types';
import { ApolloError } from 'apollo-client';

const mutation = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
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

@Component({
  selector: 'delete-post',
  template: `
    <a mat-button (click)="confim()">Delete</a>
  `,
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
      width: '300px',
      data: 'Are you sure to delete this post?'
    })
    .afterClosed().pipe(
      filter(yes => yes),
      switchMap(() => this.apollo.mutate<Response, Variables>({
        mutation, variables: { postId: this.post.id }
      })),
    )
    .subscribe((result) => {            
    }, (error: ApolloError) => {
      console.error(`[DeletePostComponent] ID: ${this.post.id}`, error);
    });
  }

}
