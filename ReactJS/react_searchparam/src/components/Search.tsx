import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query') || ''; 
    const [input, setInput] = useState(queryParam);     
  
    useEffect(() => {
      setInput(queryParam); 
    }, [queryParam]);
  
    const handleInputChange = (e:any) => {
      const value = e.target.value;
      setInput(value);
      setSearchParams(value ? { query: value } : {});  
    };
  
    return (
      <div style={{ padding: '2rem' }}>
        <h3>Search Param Demo</h3>
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={handleInputChange}
          style={{ padding: '0.5rem', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {queryParam && (
          <p style={{ marginTop: '1rem' }}>
            URL Query: <strong>{queryParam}</strong>
          </p>
        )}
      </div>
    );
  };

export default Search