import { httpStatusCode } from './httpStatusCode'

export const errorLang = {
  service: {
    userservice: 'userService',
    groupService: 'groupService',
    memberService: 'memberService',
    expenseService: 'expenseService',
  },
  process: {
    signup: 'signup',
    login: 'login',
    createGroup: 'createGroup',
    addMembers: 'addMembers',
    getAllGroup: 'getAllGroup',
    deleteGroup: 'deleteGroup',
    deleteMember: 'deleteMember',
    getAllMember: 'getAllMember',
    updateExpense: 'updateExpense',
    deleteExpense: 'deleteExpense',
  },
  message: {
    USER_ALREADY_EXISTS: 'user already exists',
    INCORRECT_DETAILS: 'incorrect details',
    SIGNUP_FAILED: 'Signup failed',
    GROUP_ALREADY_EXISTS: 'Group Already exists',
    USER_NOT_AUTHENTICATED: 'User not authenticated',
    USER_NOT_FOUND: 'User Not found',
    TOKEN_EXPIRED: 'Token exxpired',
    MEMBERS_ALREADY_EXISTS: 'Members already existes',
    UNABLE_TO_UPDATE_MEMBER: 'Unable to process update member',
    NO_MEMBER_AVAILABLE_TO_DELETE: 'No member available to delete',
    NOT_VALID_GROUP: 'Not a valid group',
    INVALID_EXPENSE_MEMBERS: 'Invalid expense members or creditor',
    TOTAL_NOT_EQUAL_TO_SHARES: 'Total is not equal to shares',
    CREDITOR_NOT_IN_GROUP: 'Creditor is not part of the group',
    ADD_EXPENSE_FAILED:
      'Something went wrong while adding expenses to the group',
    NOT_A_VALID_GROUP: 'Not a valid group',
    YOU_ARE_NOT_THE_ADMIN: 'You are not the admin of the group',
    NOT_EVERY_MEMBER_SETTLED_ON_THE_GROUP:
      'Not every member is settled in the group',
    DELETE_GROUP_ERROR: 'Group delete error',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DELETE_EXPENSE_FAILED:
    'No such expense is the part of this group',
  },
  commonErrorReturn() {
    return {
      statusCode: httpStatusCode.serverError.SERVICE_UNAVAILABLE,
      success: false,
      Message: 'Something went wrong',
    }
  },
}
