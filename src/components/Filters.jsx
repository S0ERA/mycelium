import { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

export const Filters = ({ onFilterChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const allTags = [...new Set(data.posts.flatMap((post) => post.tags))];
        setTags(allTags);
      });
  }, []);

  const handleTagSelect = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    onFilterChange(newSelectedTags);
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setIsFiltersOpen(false);
    onFilterChange([]);
  };

  return (
    <div className="filtersContainer">
      <div className="filtersDropdown">
        <button
          className="dropdownToggle"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FaFilter /> Фильтры{" "}
          {selectedTags.length > 0 && `(${selectedTags.length})`}
        </button>

        {isFiltersOpen && (
          <div className="dropdownContent">
            <div className="tagsList">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className={`tagItem ${selectedTags.includes(tag) ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagSelect(tag)}
                    hidden
                  />
                  {tag}
                  {selectedTags.includes(tag) && (
                    <FaTimes className="removeIcon" />
                  )}
                </label>
              ))}
            </div>
            <button className="resetButton" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
