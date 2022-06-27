import { useRef, useState, useEffect } from 'react';

const useElementOnScreen = (currentPage, countPages, setCurrentPage, isLoading, options) => {
    const containerRef = useRef(null);
    const [ isVisible, setIsVisible ] = useState(false);

    const callbackfunction = (entries) => {
        if(entries[0].isIntersecting && currentPage < countPages){
			setCurrentPage(currentPage + 1);
		}
        setIsVisible(true);
    }

    useEffect(() => {
        if(isLoading) return;
        const observer = new IntersectionObserver(callbackfunction, options);
        if(containerRef.current) observer.observe(containerRef.current);

        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef, options])

    return [containerRef, isVisible]
}

export default useElementOnScreen;