
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  startScreening() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/screening']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  features = [
    {
      icon: 'ϟ',
      title: 'Symptom Screening',
      description: 'Analyze reported symptoms to identify possible disease patterns.'
    },
    {
      icon: '◎',
      title: 'Real-Time Web Scraping',
      description: 'Collect relevant health news to monitor emerging disease trends.'
    },
    {
      icon: '♧',
      title: 'Weather Integration',
      description: 'Explore how local weather conditions correlate with disease patterns.'
    },
    {
      icon: '♧',
      title: 'Smart Alerts',
      description: 'Get notifications when reported patterns indicate a potential outbreak.'
    },
    {
      icon: '▥',
      title: 'Admin Analytics',
      description: 'Explore disease trends through charts, statistics and reports.'
    },
    {
      icon: '⬡',
      title: 'Privacy Protected',
      description: 'Keep health information protected with appropriate privacy controls.'
    }
  ];
}
