/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateProfile {
  __typename: "UpdateProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateProfile: updateProfile_UpdateProfile;
}

export interface updateProfileVariables {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profilePhoto?: string | null;
  password?: string | null;
  age?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  fullName: string | null;
  age: number | null;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
