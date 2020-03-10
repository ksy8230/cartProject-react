import React from 'react';
import Link from 'next/link';
import AppLayout from "../componets/AppLayout";

const home = () => {
    return (
        <AppLayout>
            <div className='pages-wrap'>
                <div style={{marginBottom:'15px'}}>
                    <Link href='/products'><a>상품리스트</a></Link><br/>
                    <p>- 상품 목록을 http://localhost:3001/productlist api 주소에서 불러옵니다.</p>
                    <p>- 아이템은 한 페이지당 5개씩 보입니다.</p>
                    <p>- 사진을 클릭시 id 값을 파라미터값으로 받아 상품 상세페이지로 이동해 동적 라우팅을 합니다.</p>
                    <p>- 장바구니 아이콘을 클릭시 우측에 미니카트가 보입니다.</p>
                    <p>- 이미 클릭한 경우 '이미 담았습니다' 알럿이 뜹니다.</p>
                    <p>- 3개 이상 클릭한 경우 '3개까지만 담을 수 있습니다' 알럿이 뜹니다.</p>
                    <p>- 미니카트의 장바구니 버튼 클릭시 장바구니 링크로 이동합니다.</p>
                </div>
                <div>
                    <Link href='/cart'><a>장바구니</a></Link>
                    <p>- 할인 쿠폰 리스트를 http://localhost:3001/coupon api 주소에서 불러옵니다.</p>
                    <p>- 옵션 수정 버튼 시 해당 상품의 수량 변경 팝업이 뜹니다.</p>
                    <p>- 체크박스로 개별 아이템을 선택하면 우측에 주문 결산 금액이 계산됩니다.</p>
                    <p>- 각 쿠폰을 셀렉트하면 범위에 맞는 할인 후 최종 금액이 하단에 보입니다.</p>
                    <p>(타입별 쿠폰 금액 테스트를 위해 10% 쿠폰 케이스 하나를 더 추가한 상태입니다)</p>
                </div>
            </div>
        </AppLayout>
    )
};

export default home;
