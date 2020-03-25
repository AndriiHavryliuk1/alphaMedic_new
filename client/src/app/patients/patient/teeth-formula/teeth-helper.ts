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
    text: 'Зуб',
    nextPanelState: 'HEALTH_TOOTH_QUESTION'
  }, {
    text: 'Відсутній зуб',
    nextPanelState: 'TOOTH_MISSING'
  }, {
    text: 'Імплант',
    state: 'IMPLANT'
  }, {
    text: 'Проміжна частина протезу',
    state: 'TOOTH_BRIDGE'
  },
];

export const REMOVED_TOOTH_STATE_QUESTIONS = [
  {
    text: 'Адентія',
    state: 'ADENTIA'
  }, {
    text: 'Ретинований',
    state: 'RETINATED'
  }, {
    text: 'Видалений',
    state: 'REMOVED'
  }
];

export const HEALTH_TOOTH_QUESTIONS = [
  {
    text: 'Здоровий',
    state: 'HEALTHY'
  }, {
    text: 'Хворий',
    nextPanelState: 'SICK_TOOTH'
  }
];

export const DEFAULT_DENTAL_FILLING_STATE = {
  text: 'Заміна(рекомендовано)',
  valueState: 'BAD'
};

export const DENTAL_FILLING_STATES = [
  DEFAULT_DENTAL_FILLING_STATE,
  {text: 'Хороший', valueState: 'GOOD'}
];

export const TEETH_CROWN_STATES = [
  {
    text: 'Карієс',
    crownState: 'CARIES',
    fillCrownColor: '#F61616',
    crownValue: {
      fillingState: DEFAULT_DENTAL_FILLING_STATE,
      segments: []
    }
  }, {
    text: 'Реставрація/пломба',
    crownState: 'DENTAL_FILLING',
    fillCrownColor: '#16F625',
    crownValue: {
      fillingState: DEFAULT_DENTAL_FILLING_STATE,
      segments: []
    }
  }, {
    text: 'Тимчасова пломба',
    crownState: 'TEMPORARY_DENTAL_FILLING',
    fillCrownColor: '#E9DB15',
    crownValue: {
      fillingState: DEFAULT_DENTAL_FILLING_STATE,
      segments: []
    }
  }, {
    text: 'Ортопедична конструкція',
    crownState: 'ORTHOPEDIC_CONSTRUCTION',
    crownValue: {}
  }, {
    text: 'Культя',
    crownState: 'CULT',
    crownValue: {
      fillingState: DEFAULT_DENTAL_FILLING_STATE,
      segments: []
    }
  }, {
    text: 'Некаріозне ураження',
    crownState: 'NOT_CARIES',
    fillCrownColor: '#E915DB',
    crownValue: {
      fillingState: DEFAULT_DENTAL_FILLING_STATE,
      segments: []
    }
  }
];

export const DEFAULT_ROOT_STATE_VALUE = {
  text: 'Рекомендовано зевізія',
  rootValue: 'SEVISION'
};

export const ROOT_STATES = [
  {
    text: 'Ендодонтія',
    rootState: 'CULT',
    rootValues: [DEFAULT_ROOT_STATE_VALUE]
  }, {
    text: 'Резекція верхівки',
    rootState: 'RESECTION_OF_APEX',
    rootValues: [DEFAULT_ROOT_STATE_VALUE]
  }, {
    text: 'Гемісекція',
    rootState: 'HEMISECTION',
    rootValues: [DEFAULT_ROOT_STATE_VALUE]
  }, {
    text: 'Запальний процес пульпи',
    rootState: 'PULP_INFLAMMATION'
  }, {
    text: 'Карієс',
    rootState: 'CARIES'
  }, {
    text: 'Резорбція',
    rootState: 'RESORPTION',
    rootValues: []
  }, {
    text: 'Вертикальна фактура(тріщина)',
    rootState: 'CRACK'
  }
];

export const ROOT_STATE_VALUES = [
    DEFAULT_ROOT_STATE_VALUE, {
    text: 'Без патологічних змін',
    rootValue: 'NO_PATHOLOGICAL'
  }
];

export const RESORPTION_VALUES = [
  {
    text: 'Верхівки',
    rootValue: 'TOP'
  }, {
    text: 'Внутрішньо-кореневе',
    rootValue: 'INSIDE'
  }
];

export const ORTHOPEDIC_CONSTRUCTION_VALUES = [
  {
    text: 'Вінір накладка',
    crownValue: 'VINIR'
  }, {
    text: 'Коронка',
    crownValue: 'CROWN'
  }, {
    text: 'Культьова вкладка',
    crownValue: 'CULT_TAB'
  }, {
    text: 'Меріленд протез',
    crownValue: 'MERILEND_PROSTHESIS'
  }, {
    text: 'Мостоподібний протез',
    crownValue: 'BRIDGE_PROSTHESIS'
  }
];

export const SICK_TOOTH_STATES = [
  {
    text: 'Клиновидний дефект',
    state: 'WEDGE_DEFECT'
  }
];

export const TRAUMA_STATES = [
  {
    text: 'Вивих',
    state: 'DISLOCATION'
  }, {
    text: 'Перелом',
    nextPanelState: 'FRACTURE'
  }
];

export const FRACTURE_STATES = [
  {
    text: 'Коронка',
    crownState: 'CROWN_FRACTURE'
  }, {
    text: 'Корінь',
    rootState: 'ROOT_FRACTURE'
  }
];

export const CROWN_FRACTURE_VALUES = [
  {
    text: 'Пульпа пошкоджена',
    crownValue: 'PULP_DAMAGED'
  }, {
    text: 'Пульпа не пошкоджена',
    crownValue: 'NO_PULP_DAMAGED'
  }
];
