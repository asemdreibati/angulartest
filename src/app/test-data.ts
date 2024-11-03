import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    let userDetails = [
      {id: '1', username: 'ALI 1', department: 'Department 1'},
      {id: '2', username: 'ALI 2', department: 'Department 2'},
      {id: '3', username: 'ALI 3', department: 'Department 3'},
      {id: '4', username: 'ALI 4', department: 'Department 4'},
      {id: '5', username: 'ALI 5', department: 'Department 5'},
      {id: '6', username: 'ALI 6', department: 'Department 6'},
      {id: '7', username: 'ALI 7', department: 'Department 7'},
      {id: '8', username: 'ALI 8', department: 'Department 8'},
      {id: '9', username: 'ALI 9', department: 'Department 9'},
      {id: '10', username: 'ALI 10', department: 'Department 10'}
    ];
    return { users: userDetails };
  }
} 