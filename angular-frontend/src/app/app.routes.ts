import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {TopicsComponent} from './topics/topics.component';
import {ProgressComponent} from './progress/progress.component';
import {TopicContentComponent} from './topic-content/topic-content.component';
import {VisualExampleComponent} from './visual-example/visual-example.component';
import {QuizComponent} from './quiz/quiz.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminTopicsComponent} from './admin/admin-topics/admin-topics.component';
import {AdminQuizzesComponent} from './admin/admin-quizzes/admin-quizzes.component';
import {AdminVisualExamplesComponent} from './admin/admin-visual-examples/admin-visual-examples.component';
import {TopicsFormComponent} from './admin/topics-form/topics-form.component';
import {QuizWizardComponent} from './admin/quiz-wizard/quiz-wizard.component';
import {AdminManageExampleComponent} from './admin/admin-manage-example/admin-manage-example.component';
import {AdminExampleFormComponent} from './admin/admin-example-form/admin-example-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route for home
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'topic/:id', component: TopicContentComponent },
  { path: 'topic/:topicId/visualExample/:visualExampleId', component: VisualExampleComponent },
  { path: 'topic/:topicId/quiz', component: QuizComponent },
  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'admin/users', component: AdminUsersComponent},
  { path: 'admin/topics', component: AdminTopicsComponent},
  { path: 'admin/quizzes', component: AdminQuizzesComponent},
  { path: 'admin/visualExamples', component: AdminVisualExamplesComponent},
  { path: 'admin/topics/:topicId/examples', component: AdminManageExampleComponent },
  { path: 'admin/topics/new', component: TopicsFormComponent },
  { path: 'admin/topics/:id/edit', component: TopicsFormComponent },
  { path: 'admin/topics/:topicId/visualExample/:visualExampleId', component: AdminExampleFormComponent },
  { path: 'admin/topics/:topicId/visualExample/new', component: AdminExampleFormComponent },
  { path: 'admin/quizzes/new', component: QuizWizardComponent },
  { path: 'admin/quizzes/:id/edit', component: QuizWizardComponent }
];
