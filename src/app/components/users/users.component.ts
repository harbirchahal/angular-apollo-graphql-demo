import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '@app/graphql-types';

const query = gql`
  query AllUsers {
    users {
      id
      name
      email
      phone
      address {
        city
      }
      company {
        name
      }
      posts {
        id
      }
    }
  }
`;

type Response = {
  users: User[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  readonly query$ = this.apollo
    .watchQuery<Response>({
      query, returnPartialData: true
    })
    .valueChanges;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit() {
  }

}
