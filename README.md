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
    TRAVEL_LIST ||--|{ TRAVEL: contains
    TRAVEL || -- |{ DIARY : contains
    TRAVEL || -- |{ PICS : contains


    USER {
      string id PK
      string email
      string password
      string name
    }

    TRAVEL_LIST {
      string userID FK
      number id PK
    }

    TRAVEL {
      number id PK
      double longitude
      double latitude
      string tavelName
      number travelListId FK
    }

    DIARY {
      number travelId FK
      number id PK
      string body
    }

    PICS {
      number travelId FK
      number id PK
      MEDIUMBLOB image
    }
```
