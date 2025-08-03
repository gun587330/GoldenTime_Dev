import { create } from 'zustand';

/**  전역 상태 관리 스토어(Zustand) **/

const useStore = create((set, get) => ({
  // ===== 인증 상태 관리 =====
  /** 현재 로그인한 사용자 정보 */
  user: null,
  
  // ===== 페이지 상태 관리 =====
  /** 현재 활성화된 페이지 */
  currentPage: 'login',
  
  // ===== 주소 상태 관리 =====
  /** 현재 주소 (7글자 초과 시 ... 처리) */
  currentAddress: '노량진동 240-30',
  
  // ===== 시간 상태 관리 =====
  /** 현재 시간 (HH:MM 형식) */
  currentTime: new Date().toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  }),
  
  // ===== 정렬 옵션 상태 관리 =====
  /** 현재 정렬 옵션 ('discount' | 'price') */
  sortOption: 'discount',
  
  // ===== 가게 데이터 상태 관리 ===== //
  /* 임시 가게 목록 데이터 (DB에서 받아올 예정) */
  stores: [
    {
      id: 1,
      name: "우리동네 치킨집",
      menu: "후라이드 치킨, 양념치킨",
      distance: 150,
      walkTime: 3,
      originalPrice: 18000,
      discountPrice: 15000,
      discountRate: 17,
      isLiked: false
    },
    {
      id: 2,
      name: "맛있는 피자집",
      menu: "페퍼로니 피자, 치즈 피자",
      distance: 200,
      walkTime: 4,
      originalPrice: 25000,
      discountPrice: 20000,
      discountRate: 20,
      isLiked: true
    },
    {
      id: 3,
      name: "신선한 샐러드",
      menu: "닭가슴살 샐러드, 연어 샐러드",
      distance: 100,
      walkTime: 2,
      originalPrice: 12000,
      discountPrice: 9000,
      discountRate: 25,
      isLiked: false
    },
    {
      id: 4,
      name: "고급 스테이크하우스",
      menu: "립 스테이크, 등심 스테이크",
      distance: 300,
      walkTime: 6,
      originalPrice: 45000,
      discountPrice: 35000,
      discountRate: 22,
      isLiked: false
    },
    {
      id: 5,
      name: "전통 한식당",
      menu: "불고기, 갈비찜",
      distance: 180,
      walkTime: 4,
      originalPrice: 15000,
      discountPrice: 12000,
      discountRate: 20,
      isLiked: true
    },
    {
      id: 6,
      name: "신메뉴 카페",
      menu: "아메리카노, 라떼",
      distance: 120,
      walkTime: 2,
      originalPrice: 8000,
      discountPrice: 6000,
      discountRate: 25,
      isLiked: false
    }
  ],

  // ===== 액션 함수들 =====
  
  /**
   * 사용자 정보 설정
   * @param {Object} user - 사용자 정보 객체
   */
  setUser: (user) => set({ user }),
  
  /**
   * 로그아웃
   */
  logout: () => set({ user: null, currentPage: 'login' }),
  
  /**
   * 현재 페이지 변경
   * @param {string} page - 변경할 페이지명
   */
  setCurrentPage: (page) => set({ currentPage: page }),
  
  /**
   * 현재 주소 변경 (7글자 초과 시 ... 처리)
   * @param {string} address - 새로운 주소
   */
  setCurrentAddress: (address) => {
    const truncatedAddress = address.length > 7 ? `${address.slice(0, 7)}...` : address;
    set({ currentAddress: truncatedAddress });
  },
  
  /**
   * 현재 시간 업데이트 (1분마다 자동 호출)
   */
  updateCurrentTime: () => set({ 
    currentTime: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }),
  
  /**
   * 정렬 옵션 변경
   * @param {string} option - 정렬 옵션 ('discount' | 'price')
   */
  setSortOption: (option) => set({ sortOption: option }),
  
  /**
   * 가게 좋아요 토글
   * @param {number} storeId - 가게 ID
   */
  toggleLike: (storeId) => set((state) => ({
    stores: state.stores.map(store => 
      store.id === storeId 
        ? { ...store, isLiked: !store.isLiked }
        : store
    )
  })),
  
  // ===== Getter 함수들 ===== //
  
  /**
   * 현재 정렬 옵션에 따른 정렬된 가게 목록 반환
   * @returns {Array} 정렬된 가게 목록
   */
  getSortedStores: () => {
    const { stores, sortOption } = get();
    const sortedStores = [...stores];
    
    switch (sortOption) {
      case 'discount':
        return sortedStores.sort((a, b) => b.discountRate - a.discountRate);
      case 'price':
        return sortedStores.sort((a, b) => a.discountPrice - b.discountPrice);
      default:
        return sortedStores;
    }
  }
}));

export default useStore;