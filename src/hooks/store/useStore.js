import { create } from 'zustand';
import { STORES_DATA } from '../../apis/mock/mockShopList';

/**  전역 상태 관리 스토어(Zustand) **/

const useStore = create((set, get) => ({
  // ===== 인증 상태 관리 =====
  /** 현재 로그인한 사용자 정보 */
  user: null,
  
  // ===== 페이지 상태 관리 =====
  /** 현재 활성화된 페이지 */
  currentPage: 'login',
  
  /** 주소 설정 페이지 접근 경로 추적 */
  fromHomePage: false,
  
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
  
  // 디버깅: 초기 currentTime 값 확인
  // console.log('useStore 초기 currentTime:', new Date().toLocaleTimeString('ko-KR', { 
  //   hour: '2-digit', 
  //   minute: '2-digit',
  //   hour12: false 
  // })),
  
  // ===== 정렬 옵션 상태 관리 =====
  /** 현재 정렬 옵션 ('discount' | 'price') */
  sortOption: 'discount',
  
  // ===== 필터 기준 상태 관리 =====
  /** 상세 필터 기준 (상세필터 페이지/바텀시트에서 수정) */
  filters: {
    // 선택된 업종 목록 (예: ['nail', 'hair'])
    categories: [],
    // 표시할 시간(가용 시간 기준). 형식: 'HH:MM' 또는 null
    availableAt: null,
    // 추후 확장: 거리, 평점, 최소 할인율 등
    // distanceKm: null,
    // ratingMin: null,
    // discountMin: null,
  },
  
  // ===== 가게 데이터 상태 관리 ===== //
  /* mockShopList.js에서 가져온 가게 목록 데이터 */
  stores: STORES_DATA,

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
   * 주소 설정 페이지 접근 경로 설정
   * @param {boolean} fromHome - HomePage에서 접근했는지 여부
   */
  setFromHomePage: (fromHome) => set({ fromHomePage: fromHome }),
  
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
  updateCurrentTime: () => {
    const newTime = new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    console.log('updateCurrentTime 호출됨, 새 currentTime:', newTime);
    set({ currentTime: newTime });
  },
  
  /**
   * 정렬 옵션 변경
   * @param {string} option - 정렬 옵션 ('discount' | 'price')
   */
  setSortOption: (option) => set({ sortOption: option }),
  
  /**
   * 상세 필터 기준 일부 업데이트
   * @param {Partial<typeof filters>} partial - 변경할 필드만 전달
   */
  setFilters: (partial) => set((state) => ({
    filters: { ...state.filters, ...partial }
  })),
  
  /** 필터 초기화 */
  resetFilters: () => set({
    filters: { categories: [], availableAt: null }
  }),
  
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

    const { stores, sortOption, filters } = get();
    console.log('getSortedStores 호출, 현재 store 상태:', get());
    let filteredStores = [...stores];
    
    // 1) 업종 필터 적용
    if (filters.categories.length > 0) {
      // 현재 mock 데이터에는 업종 정보가 없으므로 임시로 모든 가게를 표시
      // 추후 store 객체에 category 필드가 추가되면 아래 주석을 해제
      // filteredStores = filteredStores.filter(store => 
      //   filters.categories.includes(store.category)
      // );
      console.log('업종 필터 적용됨:', filters.categories);
    }

    // 2) 시간 필터 적용 (데모 데이터에는 시간 정보가 없어 필터는 no-op)
    // 추후 store 객체에 시간 메타가 추가되면 여기서 필터링
    // if (filters.availableAt) { ... }

    // 3) 정렬 적용
    switch (sortOption) {
      case 'discount':
        return filteredStores.sort((a, b) => b.discountRate - a.discountRate);
      case 'price':
        return filteredStores.sort((a, b) => a.discountPrice - b.discountPrice);
      default:
        return filteredStores;
    }
  }
}));

export default useStore;