import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {TopicsComponent} from './topics/topics.component';
import {ProgressComponent} from './progress/progress.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {TopicContentComponent} from './topic-content/topic-content.component';
import {VisualExampleComponent} from './visual-example/visual-example.component';
import {QuizComponent} from './quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route for home
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'topic/:id', component: TopicContentComponent },
  { path: 'visualExample', component: VisualExampleComponent},
  { path: 'quiz', component: QuizComponent}

];
