

#### 작업 전 폴더 구성 
- assets : css
- components : 컴포넌트 파일 / 순수함수파일(폴더로 묶기)
- pages : 페이지 기준 (예상 총 2장)
- reducers : 리듀서들 작성
- sagas : 사가들 작성

- source : 소스파일 
- server.js : 소스파일 넘겨줄 api 서버

#### 작업 전 state / action 예상
- 1. 메인상품 리스트 
- 2. 장바구니 리스트
- 3. 장바구니 화면의 상품 리스트 (2번 데이터 가져오기)


##### 상품 목록 페이지 기능 구현 및 할일
- [v] 상품 목록 로드
- [v] 상품 목록 페이지네이션 기능 추가
- [v] 상품 목록 score 기준으로 내림차순
- [v] 장바구니 버튼 - 추가 기능
- [v] 상품 추가 시 우측에 미니카트로 목록 보여줌
- [v] 담긴 상품 선택 후 - 삭제 기능
- [v] 담긴 상품은 빼기 버튼 활성화 => 버튼은 장바구니 이미지로 통일하고 미니카트에서 삭제로 대안
- [v] 상품 담은 후 장바구니 가기 누르면 장바구니 페이지
- [v] LOAD_MINICART_PRODUCT_REQUEST 사용되지 않으면 삭제하기!
- [v] 숫자 1000단위 컴마

##### 장바구니 페이지 기능 구현 및 할일
- [v] 프로토타입 짜보기
- [v] 미니카드에 담긴 데이터 로드
- [v] 체크박스로 해당 상품 선택 https://www.youtube.com/watch?v=tB8k-X-_yBE
- [v] 수량(amount) state (최소 1개)를 개별 객체 안에 넣어 상태 관리
- [v] 옵션 적용 팝업 추가
- [v] 선택한 상품만 우측에 총액 계산하기
- [v] availableCoupon = false 아닌 상품에게 쿠폰 적용
- [v] 순수함수 컴포넌트 정리
- [ ] 불필요한 코드 정리, 주석 달기 -ing
- [v] /cart 접근시 데이터 없는 경우 처리

- [v] 테스트 환경 만들기
    - 참고한 링크들
    - https://github.com/zeit/next.js/tree/canary/examples/with-jest
    - https://medium.com/@netxm/testing-redux-reducers-with-jest-6653abbfe3e1
    - https://www.youtube.com/watch?v=2d-SX8YRyis

##### +a 넣고 싶은 것 & 기타
- [v] 페이지네이션에 외부 라이브러리 사용해 디자인 적용해 보기
- [v] 컴포넌트들을 page기준으로 폴더 안에 넣기 ex)cart 페이지 관련 컴포넌트는 cart 폴더에 넣는다
- [v] 상품목록 페이지 server-side-rendering
- [ ] 장바구니 하단 추천 상품들 슬라이드 기능
- [ ] 타입스크립트 적용 (공부가 필요함)

* 새로 배운 개념
toLocaleString() : 천단위 컴마

##### 페이지 디자인
- [ ] 상품 목록 페이지 전체 완료
- [v] 장바구니 페이지 전체 완료

##### 페이지네이션 준비하기
- https://www.youtube.com/watch?v=IYCa1F-OWmk
- https://medium.com/@loshy244110/react-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-9c645c5046cd


##### 히스토리
(20.03.05) 작업 전 폴더 구성 및 파일 세팅
- 초기 레이아웃 잡기 위한 npm 설치 : next(코드 스플리팅, 서버사이드 렌더링을 위해) react, react-dom, nodemon, webpack
- state 관리를 위한 npm 설치 : redux, react-redux, redux-devtools-extension, redux-saga, axios
- 상품 목록 로드를 위한 state 설계, api 제대로 불러와지나 테스트
- sass 연결
- 상품 목록 페이지네이션 기능 추가
- 상품 클릭시 장바구니네이션 나오면서 해당 상품이 그 안에 들어가기

(20.03.05) 상품 목록 페이지 기능 구현 및 스타일링

(20.03.06) 장바구니 페이지 기능 구현 
- (add) mdbreact(부트스트랩) 라이브러리 사용하여 체크박스, 버튼, 셀렉트박스 디자인 적용
- (edit) module parse failed unexpected character '@ 에러
    - @zeit/next-css file-loader url-loader 설치 후 next.config.js파일 룰 수정
    - https://github.com/zeit/next-plugins/issues/273

(20.03.07) 장바구니 페이지 스타일링 및 페이지 검수 중 에러 수정
- (edit) /products 첫 진입시 상품 데이터는 불러와지는데 화면에 렌더링 안 되는 이슈
    - 상품을 5개씩만 보여주기 위해 불러온 데이터 중 5개만 lists 배열 안에 넣고 map으로 렌더링해주는 방식인데 lists이 처음 렌더링시 [] 빈 배열을 반환
    - => (해결) isLoadingList 라는 state 상태값을 컴포넌트디드마운트 사이클에서 true, false 여부로 감지를 시키고, isLoadingList 가 false(상품 리스트 로드 액션 성공)이 됐을 때 lists 배열 안에 훅스로 데이터를 넣어준다.
- (edit) 장바구니 아이콘 클릭시 cartList 배열 못 읽는 현상
    - => (해결) 장바구니 아이콘 클릭시 addMiniCart라는 함수가 실행되고 이 함수는 useCallback으로 감싸져있다. useCallback 두번째 인자에 targetProductIndex(추가할 상품의 index)를 구하기 위해 사용할 productsList 값을 넣어줘야 함수가 실행된다.

(20.03.08) 테스트 환경 추가
- (add) Next에 react-test-library 추가
- (add) /products 페이지 액션, 리듀서 유닛 테스트 (요청, 성공 케이스)

(20.03.09) 폴더 구조 정리, SSR 연결
- (edit) componets들 각 페이지를 기준으로 폴더 구성
- (edit) 상품리스트 영역 isLoading 값까지 ProductsList 컴포넌트로 이동
- (edit) 상품리스트 페이지 Server-Side-Rendering으로 화면 렌더링 전에 데이터 미리 불러오기
- (edit) memo를 이용한 리렌더링 최적화 작업