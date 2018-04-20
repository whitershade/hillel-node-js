const events = require('events');
const { last, sumBy, filter } = require('lodash');
const consoleLog = require('../hometask1/utils/consoleLog');

class Student extends events {
  constructor(name = '', surname = '', yearOfBirth = 0) {
    super();
    process.nextTick(() => this.emit('created'));

    this.name = name;
    this.surname = surname;
    this.yearOfBirth = yearOfBirth;
    this.attendanceAndGrades = [];

    this.setUpListeners();
    this.checkIfOuterListenersExist();
  }

  setUpListeners() {
    this.listenOnceToGetAge();
    this.listenToSetPresent();
    this.listenToSetPoint();
    this.listenToAveragePoint();
    this.listenToMaxPoint();
  }

  listenOnceToGetAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;

    this.once('userAge', callback => callback(age));
  }

  listenToSetPresent() {
    this.on('present', isPresent => this.attendanceAndGrades.push({ isPresent }));
  }

  listenToSetPoint() {
    this.on('point', (point) => {
      last(this.attendanceAndGrades).point = point;
    });
  }

  listenToAveragePoint() {
    this.on('averagePoint', callback => callback(this.getAveragePoint()));
  }

  listenToMaxPoint() {
    this.on('maxPoint', callback => callback(this.getMaxPoint()));
  }

  getAveragePoint() {
    const points = filter(this.attendanceAndGrades, 'point');
    const countOfPoint = points.length;

    if (countOfPoint === 0) return 0;

    const sumOfPoint = sumBy(points, 'point');

    return Number((sumOfPoint / countOfPoint).toFixed(2));
  }

  getMaxPoint() {
    return this.attendanceAndGrades.reduce(
      (maxPoint, { point = 0 }) => (point > maxPoint ? point : maxPoint),
      0,
    );
  }

  checkIfOuterListenersExist() {
    setTimeout(() => {
      if (this.listenerCount('created') === 0) this.emit('check', `${this.name} ${this.surname}`);
    }, 1000);
  }
}

const firstStudent = new Student('Oxxxy', 'Miron', 1985);
const secondStudent = new Student('Lana', 'Rhoades', 1996);

const log = message => answer => consoleLog(`${message} ${answer}`);

firstStudent.on('created', () => {
  consoleLog('created first student');

  // some bullshit for testing
  firstStudent.emit('userAge', log('user age is:'));
  firstStudent.emit('present', true);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 5);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 4);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 5);
  firstStudent.emit('present', true);
  firstStudent.emit('averagePoint', log('average point is:'));
  firstStudent.emit('maxPoint', log('max point is:'));
});

const nobodyListensToMe = student => consoleLog(`${student} says: nobody listens to me :c`, 'red');
firstStudent.on('check', nobodyListensToMe);
secondStudent.on('check', nobodyListensToMe);
