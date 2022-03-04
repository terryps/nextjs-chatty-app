This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

NextJS 프레임워크로 만든 채팅 웹 앱입니다. 채팅 기능 및 회원가입, 로그인, 프로필 편집 그리고 친구 추가가 가능합니다.

### Markup Languages
+ HTML
+ CSS

### Programming Language
+ Javascript(ES6)

### Libraries
+ ReactJS
+ React Redux

### Framework
+ NextJS

### Database
+ PostgreSQL

### ORM
+ Prisma

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

## PrismaClient
<br>

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
