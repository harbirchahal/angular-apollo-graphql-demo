import { Component, OnInit, Input } from '@angular/core';
import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';

@Component({
  selector: 'ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() apolloError: ApolloError;

  get networkErrors(): Array<Error> {
    const networkError = this.apolloError.networkError;
    if (networkError) {
      const error = networkError['error'];
      if (error) {
        return error.errors;
      }
    }
    return [];
  }

  get graphQLErrors(): ReadonlyArray<GraphQLError> {
    return this.apolloError.graphQLErrors;
  }

  constructor() { }

  ngOnInit() {
  }

}
