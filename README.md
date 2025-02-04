import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: Users[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Users[]>('https://jsonplaceholder.typicode.com/users')
  .subscribe(data => {
    if (Array.isArray(data)) {
      const mappedUsers = data.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username
      }));

      localStorage.setItem('users', JSON.stringify(mappedUsers));
      this.users = mappedUsers;
    } else {
      console.error('Unexpected API response:', data);
    }
  });

}
