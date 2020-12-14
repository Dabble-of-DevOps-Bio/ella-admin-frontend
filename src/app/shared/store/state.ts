import { RouterReducerState } from '@ngrx/router-store';
import { PublicLoginPageState } from '@app/public/login/shared/store';
import { UserState } from '@shared/user';
import { AccountUsersPageState } from '@app/account/users/shared/store';
import { PublicForgotPasswordPageState } from '@app/public/forgot-password/shared/store';
import { AuthState } from '@shared/auth';
import { AccountProfilePageState } from '@app/account/profile/shared/store';
import { AccountUserGroupsPageState } from '@app/account/user-groups/shared/store';
import { PublicResetPasswordPageState } from '@app/public/reset-password/shared/store';
import { AccountGenePanelsPageState } from '@app/account/gene-panels/shared/store';
import { AccountAnalysesPageState } from '@app/account/analyses/shared/store';

export class AppState {
  public router: RouterReducerState<any>;
  public publicLoginPage?: PublicLoginPageState;
  public authState?: AuthState;
  public userState?: UserState;
  public accountUsersPage?: AccountUsersPageState;
  public publicForgotPasswordPage?: PublicForgotPasswordPageState;
  public accountProfilePage?: AccountProfilePageState;
  public accountUserGroupsPage?: AccountUserGroupsPageState;
  public publicResetPasswordPage?: PublicResetPasswordPageState;
  public accountGenePanelsPage?: AccountGenePanelsPageState;
  public accountAnalysesPage?: AccountAnalysesPageState;
}
