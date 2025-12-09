import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems$: Observable<MenuItem[]>;
  sidebarOpen$: Observable<boolean>;

  constructor(private menuService: MenuService, private router: Router) {
    this.menuItems$ = this.menuService.getMenuItems();
    this.sidebarOpen$ = this.menuService.sidebarOpen$;
  }

  ngOnInit(): void {}

  toggleItem(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      this.menuService.toggleMenuItem(item.id);
    } else if (item.route) {
      this.router.navigate([item.route]);
      this.closeSidebar();
    }
  }

  closeSidebar(): void {
    this.menuService.closeSidebar();
  }

  onOverlayClick(): void {
    this.closeSidebar();
  }
}
