//export const fetchAddressResults = async (keyword) => {
//    // 환경 변수에서 API 키를 가져오거나, 임시 키 사용
//    const API_KEY = process.env.REACT_APP_JUSO_API_KEY || "U01TX0FVVEgyMDIzMDkyNjE0NDUzN1hZMjAwMzEwNzE5NzQ=";
//    const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${API_KEY}&currentPage=1&countPerPage=30&keyword=${encodeURIComponent(keyword)}&resultType=json`;

//    try {
//        const response = await fetch(url);
//        console.log('API 응답 상태:', response.status); // 디버깅 로그 추가
        
//        if (!response.ok) throw new Error('API 호출 실패');
//        const data = await response.json();
//        console.log('API 응답 데이터:', data); // 디버깅 로그 추가
        
//        return data.results?.juso || [];
//    } catch (error) {
//        console.error('주소 검색 오류:', error);
//        return [];        
//    }
//};

export const fetchAddressResults = async (keyword) => {
    const API_KEY = process.env.REACT_APP_JUSO_API_KEY; // .env 파일에 있음
    const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${API_KEY}&currentPage=1&countPerPage=30&keyword=${encodeURIComponent(keyword)}&resultType=json`;

    //console.log('API 호출 URL:', url); // 디버깅 로그 추가
    //console.log('API 키 확인:', API_KEY ? '있음' : '없음'); // 디버깅 로그 추가

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API 호출 실패');
        const data = await response.json();
        return data.results?.juso || [];
    } catch (error) {
        console.error('주소 검색 오류:', error);
        return [];        
    }
};