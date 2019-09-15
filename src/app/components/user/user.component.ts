import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from '@app/graphql-types';

const fragment = gql`
  fragment UserName on User {
    name
  }
`;

const query = gql`
  query OneUser($userId: Int!) {
    user(userId: $userId) {
      id
      name
      email
      phone
      address {
        street
        city
        zipcode
      }
      company {
        name
        bs
      }
      posts {
        id
        title
        comments {
          id
        }
      }
    }
  }
`;

type Response = {
  user: User;
}

type Variables = {
  userId: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  readonly name$ = this.route.paramMap.pipe(
    map(params => params.get('id')),
    map(id => this.apollo.getClient()
      .readFragment<User>({
        id: 'User:' + id, fragment
      })
    ),
    map((user: User) => user && user.name || 'User')
  );

  readonly query$ = this.route.paramMap.pipe(
    map(params => +params.get('id')),
    switchMap(id => this.apollo
      .watchQuery<Response, Variables>({
        query, returnPartialData: true, variables: { userId: id }
      })
      .valueChanges.pipe(
        catchError((err: ApolloError) => of(err))
      )
    ));

  constructor(
    private readonly apollo: Apollo,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
