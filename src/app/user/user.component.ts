import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: User[];
  isDataLoading: boolean = true;
  isAddUserVisible: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe((userList: any) => {
      this.userList = userList;
      this.isDataLoading = false;
    });
  }

  enableEdit(user) {
    user.isEditing = true;
    user.preservedValue = { ...user, isEditing: false };
  }

  doneEditing(user) {
    delete user.preservedValue;
    this.userService.update(user).subscribe((userResponse: any) => {
      user.isEditing = false;
      //Object.keys(user).map(key => (user[key] = userResponse[key]));
    });
  }

  cancelEditing(user) {
    user.isEditing = false;
    const preservedValue = user.preservedValue;
    delete user.preservedValue;
    Object.keys(user).map(key => (user[key] = preservedValue[key]));
  }

  toggleAddUser() {
    this.isAddUserVisible = !this.isAddUserVisible;
  }

  addUserEvent($event) {
    if ($event.type == 'cancel') {
      this.isAddUserVisible = false;
    } else if ($event.type == 'save') {
      this.isAddUserVisible = false;
      this.userService.add($event.data).subscribe((response: any) => {
        this.userList.push(response);
      });
    }
  }

  remove(user, i) {
    this.userService.remove(user).subscribe((response: any) => {
      this.userList.splice(i, 1);
    });
  }
}
