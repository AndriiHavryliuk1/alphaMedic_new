export const UPPER_TEETH = [
  {
    number: 1.8,
    imgSrc: ''
  }, {
    number: 1.7,
    imgSrc: ''
  }, {
    number: 1.6,
    imgSrc: ''
  }, {
    number: 1.5,
    imgSrc: ''
  }, {
    number: 1.4,
    imgSrc: ''
  }, {
    number: 1.3,
    imgSrc: ''
  }, {
    number: 1.2,
    imgSrc: ''
  }, {
    number: 1.1,
    imgSrc: ''
  }, {
    number: 2.1,
    imgSrc: ''
  }, {
    number: 2.2,
    imgSrc: ''
  }, {
    number: 2.3,
    imgSrc: ''
  }, {
    number: 2.4,
    imgSrc: ''
  }, {
    number: 2.5,
    imgSrc: ''
  }, {
    number: 2.6,
    imgSrc: ''
  }, {
    number: 2.7,
    imgSrc: ''
  }, {
    number: 2.8,
    imgSrc: ''
  }
];

export const LOWER_TEETH = [
  {
    number: 4.8,
    imgSrc: ''
  }, {
    number: 4.7,
    imgSrc: ''
  }, {
    number: 4.6,
    imgSrc: ''
  }, {
    number: 4.5,
    imgSrc: ''
  }, {
    number: 4.4,
    imgSrc: ''
  }, {
    number: 4.3,
    imgSrc: ''
  }, {
    number: 4.2,
    imgSrc: ''
  }, {
    number: 4.1,
    imgSrc: ''
  }, {
    number: 3.1,
    imgSrc: ''
  }, {
    number: 3.2,
    imgSrc: ''
  }, {
    number: 3.3,
    imgSrc: ''
  }, {
    number: 3.4,
    imgSrc: ''
  }, {
    number: 3.5,
    imgSrc: ''
  }, {
    number: 3.6,
    imgSrc: ''
  }, {
    number: 3.7,
    imgSrc: ''
  }, {
    number: 3.8,
    imgSrc: ''
  }
];


export const UPPER_TEETH_CHILDREN = [
  {
    number: 5.5,
    imgSrc: ''
  }, {
    number: 5.4,
    imgSrc: ''
  }, {
    number: 5.3,
    imgSrc: ''
  }, {
    number: 5.2,
    imgSrc: ''
  }, {
    number: 5.1,
    imgSrc: ''
  }, {
    number: 6.1,
    imgSrc: ''
  }, {
    number: 6.2,
    imgSrc: ''
  }, {
    number: 6.3,
    imgSrc: ''
  }, {
    number: 6.4,
    imgSrc: ''
  }, {
    number: 6.5,
    imgSrc: ''
  }
];

export const LOWER_TEETH_CHILDREN = [
  {
    number: 8.5,
    imgSrc: ''
  }, {
    number: 8.4,
    imgSrc: ''
  }, {
    number: 8.3,
    imgSrc: ''
  }, {
    number: 8.2,
    imgSrc: ''
  }, {
    number: 8.1,
    imgSrc: ''
  }, {
    number: 7.1,
    imgSrc: ''
  }, {
    number: 7.2,
    imgSrc: ''
  }, {
    number: 7.3,
    imgSrc: ''
  }, {
    number: 7.4,
    imgSrc: ''
  }, {
    number: 7.5,
    imgSrc: ''
  }
];


export const ROOT_STATE_QUESTIONS = [
  {
    text: "Зуб",
    nextState: "EARLIER_CARE_QUESTION"
  }, {
    text: "Відсутній зуб",
    nextState: "TOOTH_MISSING"
  }, {
    text: "Імплант",
    nextState: "IMPLANT"
  }, {
    text: "Проміжна частина протезу",
    nextState: "TOOTH_BRIDGE"
  },
];

export const REMOVED_TOOTH_STATE_QUESTIONS = [
  {
    text: "Адентія",
    state: "ADENTIA"
  }, {
    text: "Ретинований",
    state: "RETINATED"
  }, {
    text: "Видалений",
    state: "REMOVED"
  }
];

export const HEALTH_TOOTH_QUESTIONS = [
  {
    text: "Здоровий",
    state: "HEALTHY"
  }, {
    text: "Хворий",
    nextState: "SICK_TOOTH"
  }
];

export const TEETH_CROWN_STATES = [
  {
    text: "Культя",
    state: "CULT"
  }, {
    text: "Реставрація/пломба",
    state: "DENTAL_FILLING"
  }, {
    text: "Тимчасова пломба",
    state: "TEMPORARY_DENTAL_FILLING"
  }, {
    text: "Ортопедична конструкція",
    state: "ORTHOPEDIC_CONSTRUCTION"
  }
];

export const ROOT_STATES = [
  {
    text: "Ентодонтія",
    state: "CULT"
  }, {
    text: "Резекція верхівки",
    state: "RESECTION_OF_APEX"
  }, {
    text: "Гемісекція",
    state: "HEMISECTION"
  }
];
