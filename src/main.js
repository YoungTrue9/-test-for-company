import './styles/style.scss';

const courses = [
  {
    title: 'The Ultimate Google Ads Training Course',
    category: 'Marketing',
    price: '$100',
    author: 'Jerome Bell',
    image: '/images/c63086c15719088561c8ec14b31455901e6aced2.jpg',
  },
  {
    title: 'Product Management Fundamentals',
    category: 'Management',
    price: '$480',
    author: 'Marvin McKinney',
    image: '/images/4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg',
  },
  {
    title: 'HR Management and Analytics',
    category: 'HR & Recruiting',
    price: '$200',
    author: 'Leslie Alexander Li',
    image: '/images/1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg',
  },
  {
    title: 'Brand Management & PR Communications',
    category: 'Marketing',
    price: '$530',
    author: 'Kristin Watson',
    image: '/images/e6c7967bad5827ead11861fa456bdb395058c281.jpg',
  },
  {
    title: 'Graphic Design Basic',
    category: 'Design',
    price: '$500',
    author: 'Guy Hawkins',
    image: '/images/1adcaf7957590e8cdfee47506b5afbb5f1d3d251.jpg',
  },
  {
    title: 'Business Development Management',
    category: 'Management',
    price: '$400',
    author: 'Dianne Russell',
    image: '/images/1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg',
  },
  {
    title: 'Highload Software Architecture',
    category: 'Development',
    price: '$600',
    author: 'Brooklyn Simmons',
    image: '/images/26b7504f2f3ca140714e87c67d19cee808f942e3.jpg',
  },
  {
    title: 'Human Resources - Selection and Recruitment',
    category: 'HR & Recruiting',
    price: '$150',
    author: 'Kathryn Murphy',
    image: '/images/56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg',
  },
  {
    title: 'User Experience. Human-centered Design',
    category: 'Design',
    price: '$240',
    author: 'Cody Fisher',
    image: '/images/39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg',
  },
];

const categoryColors = {
  Marketing: 'success',
  Management: 'info',
  'HR & Recruiting': 'warning',
  Design: 'danger',
  Development: 'purple',
};

const filters = ['All', 'Marketing', 'Management', 'HR & Recruiting', 'Design', 'Development'];

const coursesElement = document.querySelector('#courses');
const filtersElement = document.querySelector('#filters');
const searchElement = document.querySelector('#search');
const loadMoreElement = document.querySelector('#loadMore');

let activeFilter = 'All';

function getCategoryCount(category) {
  if (category === 'All') {
    return courses.length;
  }

  return courses.filter((course) => course.category === category).length;
}

function renderFilters() {
  filtersElement.innerHTML = filters
    .map((filter) => {
      const isActive = filter === activeFilter;
      const count = getCategoryCount(filter);

      return `
        <button
          class="courses__filter${isActive ? ' courses__filter_active' : ''}"
          type="button"
          data-filter="${filter}"
          aria-pressed="${isActive}"
        >
          <span class="courses__filter-name">${filter}</span>
          <span class="courses__filter-count">${count}</span>
        </button>
      `;
    })
    .join('');
}

function getVisibleCourses() {
  const searchValue = searchElement.value.trim().toLowerCase();

  return courses.filter((course) => {
    const isFilterMatch = activeFilter === 'All' || course.category === activeFilter;
    const isSearchMatch = course.title.toLowerCase().includes(searchValue);

    return isFilterMatch && isSearchMatch;
  });
}

function createCourseCard(course) {
  const color = categoryColors[course.category] || 'info';

  return `
    <article class="course-card">
      <img class="course-card__image" src="${course.image}" alt="${course.title}" />

      <div class="course-card__content">
        <span class="course-card__category course-card__category_${color}">
          ${course.category}
        </span>

        <h2 class="course-card__title">${course.title}</h2>

        <p class="course-card__meta">
          <span class="course-card__price">${course.price}</span>
          <span class="course-card__author">by ${course.author}</span>
        </p>
      </div>
    </article>
  `;
}

function renderCourses() {
  const visibleCourses = getVisibleCourses();

  if (!visibleCourses.length) {
    coursesElement.innerHTML = '<p class="courses__empty">No courses found</p>';
    loadMoreElement.hidden = true;
    return;
  }

  coursesElement.innerHTML = visibleCourses.map(createCourseCard).join('');
  loadMoreElement.hidden = false;
}

filtersElement.addEventListener('click', (event) => {
  const filterButton = event.target.closest('.courses__filter');

  if (!filterButton) {
    return;
  }

  activeFilter = filterButton.dataset.filter;

  renderFilters();
  renderCourses();
});

searchElement.addEventListener('input', renderCourses);

loadMoreElement.addEventListener('click', () => {
  coursesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

renderFilters();
renderCourses();
