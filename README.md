This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

NextJS 프레임워크로 만든 채팅 웹 앱입니다. 채팅 기능 및 회원가입, 로그인, 프로필 편집 그리고 친구 추가가 가능합니다.

### Markup Language
+ HTML5 - 리액트의 JSX에서 사용됐다.

### StyleSheet
+ CSS3
+ SCSS (preprocessor)

### Programming Language
+ Javascript(ES6)

### Libraries
+ ReactJS - 유저 인터페이스를 만들었다.
+ React Redux - 앱의 전역 변수를 관리했다.

### Framework
+ NextJS - pre-rendering을 통해 SEO를 향상시켰다.

### Database
+ PostgreSQL - 앱의 데이터베이스를 구축하는데 쓰였다.

### ORM
+ Prisma - 자바스크립트의 객체로 관계형 데이터베이스인 PostgreSQL의 데이터 테이블에 접근가능하게 하였다.

<br>

## Getting Started
```bash
npm run start
```

Project structure
```
└─ Github
      ├── components
      │     ├── chat
      │     │    ├── ChatSection.js
      │     │    └── TextForm.js
      │     ├── common
      │     │    └── Layout.js
      │     ├── forms
      │     │    ├── EditForm.js
      │     │    ├── LoginForm.js
      │     │    └── SignUpProcess.js
      │     ├── home
      │     │    ├── FriendList.js
      │     │    ├── HomeSection.js
      │     │    ├── Profile.js
      │     │    └── Request.js
      │     └── modals
      ├── lib
      │     ├── PrismaClient.js
      │     └── utils.js
      ├── middlewares
      ├── pages
      │     ├── _app.js
      │     ├── index.js
      │     ├── [username]
      │     ├── accounts
      │     │    ├── edit.js
      │     │    ├── logout.js
      │     │    └── signup.js
      │     └── api
      │          ├── accounts ── login.js, signup.js
      │          ├── chat ── index.js, add.js, like.js
      │          ├── friends ── index.js, add.js
      │          ├── requests ── index.js, delete.js
      │          └── user ── index.js, update.js
      └── redux
            ├── actions
            │    ├── actionTypes.js
            │    ├── authenticateActions.js
            │    └── modalActions.js
            └── index.js
```
<br>

## Components
### common
+ `Layout` : 앱 전체에 적용되는 `Head`, `main` 요소를 렌더링하는 컴포넌트.
### chat
+ `ChatSection`: 채팅 섹션.
+ `TextForm` : 채팅을 입력하는 `form` 요소.
### forms
+ `EditForm` : 프로필 편집 양식.
+ `LoginForm` : 로그인 입력 앙식.
+ `SignUpProcess` : 회원가입 절차를 위한 컴포넌트.
### home
+ `HomeSection` : 홈 섹션.
+ `Profile` : 홈 페이지의 프로필 컴포넌트.
+ `FriendList` : 홈 페이지의 친구 목록.
+ `Request` : 홈 페이지의 친구 요청 목록.
### modals
+ `Modal` : 메세지 모달, 친구 추가 모달 등.
<br>

## Database
PostgreSQL을 사용했다. 채팅 앱과 같이 사용자 간의 친구 여부, 채팅방 같은 객체들의 관계를 정의하기 위해 객체 관계 데이터베이스를 사용하였다.

## PrismaClient
### Problems
#### Connection issue
api 요청을 할 때마다 데이터 베이스에 연결이 너무 많아졌다. 요청이 있을 때마다 `new PrismaClient()` 인스턴스가 생성되고 연결 수가 최대치(100)를 초과했기 때문이다.

#### Solution
PrismaClient 인스턴스를 전역 변수로 선언하여 모듈화한다. 전역 변수에 prisma가 이미 존재하면 이것을 써서 db에서 데이터를 가져올 수 있기 때문에 통신 개수가 증가하지 않는다.

before modified<br>
`api/accounts/login`
```js
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({...});
}
```

after modified<br>
`lib/PrismaClient`
```js
import { PrismaClient } from "@prisma/client"

let prisma;

if(process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if(!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
```
<br>

`api/accounts/login`

```js
import prisma from "lib/PrismaClient"

export default async function handler(req, res) {
    const users = await prisma.user.findMany({...});
}
```
---

### REF
[Managing DB connections for Prisma Client JS](https://github.com/prisma/prisma/issues/5007#issuecomment-618433162)


---

## React Redux
+ `actions/actionTypes` : 리듀서의 액션 타입.
+ `actions/authenticateActions` : 유저 정보, 로그인 상태, 채팅 참여자 상태와 관련된 액션 함수들.
+ `actions/modalActions` : 모달 창의 열림, 닫힘, 내용과 관련된 액션 함수들.
+ `index.js` : 초기 상태와 리듀서를 정의하고 리덕스 스토어를 생성. redux-wrapper를 생성. `wrapper`는 NextJS에서 모든 컴포넌트와 페이지에서 동일한 상태의 스토어를 가져오기 위해서 필요하다.

### installation
```bash
npm install next-redux-wrapper react-redux --save
```

### Usage

1. 모든 페이지와 컴포넌트에서 리덕스 스토어를 이용할 수 있게 `wrapper` 로 `app` 전체를 감싼다.
```js
import wrapper from "redux/index";

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp);
```
2. connect 함수로 스토어에서 필요한 상태와 액션을 가져온다.
```js
const ComponentName = ({isLoggedIn, someAction}) => {
    return (...)
}

export default connect(
    state=>({ isLoggedIn: state.isLoggedIn }),
    { someAction }
)(ComponentName);
```
