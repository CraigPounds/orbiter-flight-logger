'use strict';

const DATA = {
  loggedIn: false,
  mockUsers: [
    {
      '_id': '111111111',
      'firstName': 'Jon',
      'lastName': 'Doe',
      'userName': 'jd',
      'password': 'password1',
      'email': 'jd@gmail.com',
      'os': 'Windows 7',
      'orbiterVersion': '2010'
    },
    {
      '_id': '222222222',
      'firstName': 'Jane',
      'lastName': 'Doe',
      'userName': 'jan',
      'password': 'password2',
      'email': 'jd@gmail.com',
      'os': 'Windows 10',
      'orbiterVersion': '2016'
    },
    {
      '_id': '333333333',
      'firstName': 'Napes',
      'lastName': 'Weaver',
      'userName': 'napes',
      'password': 'password3',
      'email': 'nweaver@gmail.com',
      'os': 'Windows XP',
      'orbiterVersion': '2016'
    }
  ],
  mockMissions: [
    {
      '_id': 'aaaaaaaaa',
      'user': '333333333',
      'title': 'Mission to Mars',
      'logs': [
        {
          'id': '1',
          'title': 'Take Off',
          'date': '2018-19-9',
          'vessel': 'XR-5',
          'log': 'Tenetur sint modi autem dolorum iure. Commodi molestiae perspiciatis rem ducimus excepturi quia qui quae aliquid. Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '2',
          'title': 'Docking',
          'date': '2018-19-9',
          'vessel': 'XR-5',
          'log': 'Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '3',
          'title': 'Eject to Mars',
          'date': '2018-19-9',
          'vessel': 'AR-18',
          'log': 'Omnis illum quam beatae vitae est dolor. Animi quis quis qui deserunt aut. Magnam quam in vel culpa atque repudiandae vitae. Voluptatem nemo sapiente. Aspernatur soluta aliquid optio quam.'
        }
      ]
    },
    {
      '_id': 'bbbbbbbbb',
      'user': '333333333',
      'title': 'Moon Mission',
      'logs': [
        {
          'id': '1',
          'title': 'Launch',
          'date': '1970-15-7',
          'vessel': 'Apollo 18',
          'log': 'Tenetur sint modi autem dolorum iure. Commodi molestiae perspiciatis rem ducimus excepturi quia qui quae aliquid. Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '2',
          'title': 'Eject Burn / Atlas Separation',
          'date': '1970-15-7',
          'vessel': 'Apollo 18',
          'log': 'Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '3',
          'title': 'Encounter and Capture',
          'date': '1970-17-7',
          'vessel': 'Apollo 18',
          'log': 'Omnis illum quam beatae vitae est dolor. Animi quis quis qui deserunt aut. Magnam quam in vel culpa atque repudiandae vitae. Voluptatem nemo sapiente. Aspernatur soluta aliquid optio quam.'
        },
        {
          'id': '4',
          'title': 'LEM Descent',
          'date': '1970-17-7',
          'vessel': 'Apollo 18',
          'log': 'Omnis illum quam beatae vitae est dolor. Animi quis quis qui deserunt aut. Magnam quam in vel culpa atque repudiandae vitae. Voluptatem nemo sapiente. Aspernatur soluta aliquid optio quam.'
        }
      ]
    },
    {
      '_id': 'ccccccccc',
      'user': '111111111',
      'title': 'Venus Flyby',
      'logs': [
        {
          'id': '1',
          'title': 'Earth Escape',
          'date': '2033-5-4',
          'vessel': 'DG-IV',
          'log': 'Tenetur sint modi autem dolorum iure. Commodi molestiae perspiciatis rem ducimus excepturi quia qui quae aliquid. Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '2',
          'title': 'Earth Eject',
          'date': '2033-5-4',
          'vessel': 'DG-IV',
          'log': 'Aut incidunt adipisci non ea nihil. Ipsum modi rem.'
        },
        {
          'id': '3',
          'title': 'Midcourse Correction',
          'date': '2033-1-7',
          'vessel': 'DG-IV',
          'log': 'Omnis illum quam beatae vitae est dolor. Animi quis quis qui deserunt aut. Magnam quam in vel culpa atque repudiandae vitae. Voluptatem nemo sapiente. Aspernatur soluta aliquid optio quam.'
        }
      ]
    }
  ]
};

export { DATA };