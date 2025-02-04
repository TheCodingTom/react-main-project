import { useEffect, useState } from 'react'
import { useParams } from 'react-router';

// import styles from "../styles/gallery.module.css"

type PixabayResult = {
    hits: PixabayData[];
    total: number;
    totalHits: number;
  };
  
  type PixabayData = {
    id: number;
    previewURL: string;
    webformatURL: string;
  };

const Gallery = () => {
    const { countryName } = useParams();

    const [pixabayData, setPixabayData] = useState<PixabayData[] | null>(null);
    const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=city+landscape+${countryName}&image_type=photo&pretty=true&per_page=10`;
  
    const getPixabayData = async () => {
        try {
          const response = await fetch(pixabayUrl);
          const result = (await response.json()) as PixabayResult;
          console.log(result);
          setPixabayData(result.hits);
        } catch (error) {
          console.log("error in the fetch:", error);
        }
      };

      useEffect(() => {
          
          getPixabayData();
        }, []);
  
    return (
    <div>
        {/* {pixabayData && 
          pixabayData.map((item) => {
            return (
              <div key={item.id} className={styles.container}>
                <img
                  className={styles.picture}
                  src={item.webformatURL}
                  alt={"picture of" + { countryName }}
                />
              </div>
            );
          })} */}
    </div>
  )
}

export default Gallery