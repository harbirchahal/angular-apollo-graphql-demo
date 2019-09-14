import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '@app/graphql-types';
import { CommentsComponent } from '../comments/comments.component';

const query = gql`
  query AllPosts {
    posts {
      id
      title
      body
      author {
        id
        name
      }
      comments {
        id
      }
    }
  }
`;

type Response = {
  posts: Post[];
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  readonly query$ = this.apollo
    .watchQuery<Response>({
      query, returnPartialData: true
    })
    .valueChanges;

  constructor(
    private readonly apollo: Apollo,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  showComments(post: Post) {
    this.dialog.open(CommentsComponent, {
      height: '500px',
      width: '700px',
      data: post.id
    });
  }

}
