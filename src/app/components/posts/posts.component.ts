import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '@app/graphql-types';

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

  constructor(private readonly apollo: Apollo) { }

  ngOnInit() {
  }

  showComments(post) {
  }

}
