import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: '15527272727',
    password: 'a123123',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    username: 'xjycf.' + Mock.Random.integer(100000, 100999),
    mobile: '155' + Mock.Random.integer(10000000, 99999999),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    regDate: Mock.Random.date(),
    followUpDate: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
