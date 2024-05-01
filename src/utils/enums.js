/*eslint-disable no-useless-computed-key*/
export const enumProfilesUser = Object.freeze({
  SUPER_ADMIN: 1,
  MANAGER: 2,
  SPECIALIST: 3,
  PATIENT: 4
});

export const enumUserTypes = Object.freeze({
  PLAYER_SILVER: 1,
  PLAYER_GOLD: 2,
  SCHOOL_SILVER: 3,
  SCHOOL_GOLD: 4,
  TEAM_SILVER: 5,
  TEAM_GOLD: 6,
  INTERMEDIARY_SILVER: 7,
  INTERMEDIARY_GOLD: 8,
  SCOUTING_SILVER: 9,
  SCOUTING_GOLD: 10,
  TOURNAMENT_SILVER: 11,
  TOURNAMENT_GOLD: 12,
  BUSINESS_SILVER: 13,
  BUSINESS_GOLD: 14,
  COACH_SILVER: 17,
  COACH_GOLD: 18,
  CAZATALENTOS_SILVER: 15,
  CAZATALENTOS_GOLD: 16
});

export const enumFreeUserTypes = Object.freeze([
  enumUserTypes.PLAYER_SILVER,
  enumUserTypes.SCHOOL_SILVER,
  enumUserTypes.TEAM_SILVER,
  enumUserTypes.INTERMEDIARY_SILVER,
  enumUserTypes.SCOUTING_SILVER,
  enumUserTypes.TOURNAMENT_SILVER,
  enumUserTypes.BUSINESS_SILVER,
  enumUserTypes.COACH_SILVER
]);

export const enumRolesPlans = Object.freeze({
  ['jugador-tecnico']: {
    PLAYER: {
      FREE: enumUserTypes.PLAYER_SILVER,
      NO_FREE: enumUserTypes.PLAYER_GOLD
    },
    COACH: {
      FREE: enumUserTypes.COACH_SILVER,
      NO_FREE: enumUserTypes.COACH_GOLD
    }
  },
  ['escuela-equipo']: {
    SCHOOL: {
      FREE: enumUserTypes.SCHOOL_SILVER,
      NO_FREE: enumUserTypes.SCHOOL_GOLD
    },
    TEAM: {
      FREE: enumUserTypes.TEAM_SILVER,
      NO_FREE: enumUserTypes.TEAM_GOLD
    }
  },
  ['intermediario-scouting']: {
    INTERMEDIARY: {
      FREE: enumUserTypes.INTERMEDIARY_SILVER,
      NO_FREE: enumUserTypes.INTERMEDIARY_GOLD
    },
    SCOUTING: {
      FREE: enumUserTypes.SCOUTING_SILVER,
      NO_FREE: enumUserTypes.SCOUTING_GOLD
    }
  },
  ['torneo-empresa']: {
    TOURNAMENT: {
      FREE: enumUserTypes.TOURNAMENT_SILVER,
      NO_FREE: enumUserTypes.TOURNAMENT_GOLD
    },
    BUSINESS: {
      FREE: enumUserTypes.BUSINESS_SILVER,
      NO_FREE: enumUserTypes.BUSINESS_GOLD
    }
  }
});

export const enumMemberships = Object.freeze({
  FREE: [1],
  NO_FREE: [2]
});

export const messageSourcesNoLogout = Object.freeze({
  SEND_MESSAGE: 'send_message',
  FOLLOW_USER: 'follow_user',
  CALLS_LIST: 'calls_list'
});

export const regionFilterId = 34;
