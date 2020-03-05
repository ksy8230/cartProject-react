

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
- LOAD_MINICART_PRODUCT_REQUEST 사용되지 않으면 삭제하기!
- 숫자 1000단위 컴마
- [ ] ssr

##### 장바구니 페이지 기능 구현 및 할일
- [ ] 미니카드에 담긴 데이터 로드
- [ ] 체크박스로 해당 상품 선택
- [ ] 수량 선택 state (최소 1개)
- [ ] availableCoupon = true 상품에게 쿠폰 적용

##### 페이지 디자인
- [ ] 상품 목록 페이지 전체 완료
- [ ] 장바구니 페이지 전체 완료

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

(20.03.05) 작업 전 폴더 구성 및 파일 세팅
- 상품 목록 페이지 기능 구현 및 스타일링