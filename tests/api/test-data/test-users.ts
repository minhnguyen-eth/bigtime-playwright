/**
 * Test user IDs for payroll & tax scenarios
 */
export const TestUsers = {
  // ========================================
  // USER IDs
  // ========================================

  // Employee with no dependent
  USERID_BAT100_NO_DEPENDENT: 'EVMI6Dgbh7',

  // Employee with 1 dependent
  USERID_BAT101_1_DEPENDENT: 'gS8dKlPvCX',

  // Employee with 2 dependents
  USERID_BAT102_2_DEPENDENT: '8HSIZ7mOgQ',

  // Employee - deduction date not yet arrived
  USERID_BAT105_1_DEPENDENT_NOT_YET_DEDUCTION_DAY: 'leRkpFpfhf',

  // Employee with expired dependent
  USERID_BAT106_EXPIRED_DEPENDENT: '525Yy9jnTe',

  // Employee - NPT generated mid-month
  USERID_BAT107_NPT_GENERATED_IN_THE_MIDDLE_OF_THE_MONTH: 'SPj1oMY3UA',

  // Employee - NPT ending mid-month
  USERID_BAT108_NPT_ENDING_IN_THE_MIDDLE_OF_THE_MONTH: 'K8nLltrz6N',

  // Employee with highest salary (highest tax rate)
  USERID_BAT109_HIGHEST_SALARY: 'nVYnlhAB0w',

  // Employee with 1 regular leave
  USERID_BAT402_1_REGULAR_LEAVE: 'y1ZY2lpQCk',

  // Employee with 1 annual leave
  USERID_BAT400_1_ANNUAL_LEAVE: 'EpNMcu5LPs',

  // ========================================
  // USER CODES (for check-in/check-out)
  // ========================================

  USERCODE_BAT810: 'BAT810',
} as const;
