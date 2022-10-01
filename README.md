# Inter-Travel

- 요구사항
- 데이터 베이스 설계

## 요구사항

1. 유저들은 여러가지 여행 리스트를 가질 수 있다.
2. 여행 리스트 중 하나를 선택하면 내가 이전에 여행했던 곳들을 볼 수 있다.
3. 내가 여행 했던 여행지 마다 일기를 볼 수 있으며 사진 또한 같이 볼 수 있다.
4. 일기, 사진은 따로 따로 모아서 볼 수 있다.

## 데이터 베이스 설계

```mermaid
erDiagram
    USER ||--|{ TRAVEL_LIST : allow
    TRAVEL_LIST ||--|{ POINT : contains
    POINT || -- |{ DIARY : contains
    POINT || -- |{ PICS : contains
    USER || -- |{ DIARY : cotains
    USER || -- |{ PICS : cotains

    USER {
      string id PK
      string email
      string password
      string name
    }

    TRAVEL_LIST {
      string userID FK
      string id PK
      string tavelName
    }

    POINT {
      string travelID FK
      string id PK
      double longitude
      double latitude
    }

    DIARY {
      string pointID FK
      string userID FK
      string id PK
      string body
    }

    PICS {
      string pointID FK
      string userID FK
      string id PK
      MEDIUMBLOB image
    }
```

```mermaid
gitGraph
  branch login
  commit id: "로그인"
  commit id: "회원가입"
  branch regist
  commit id: "회원가입 양식"
  checkout login
  merge regist id: "move to login"
  chekout main
  merge login id: "success login" tag: "메인 페이지 이동" type: REVERSE
```
