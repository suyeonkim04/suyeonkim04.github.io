document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
  
    const imageData = [
      { src: 'images/class-site-computer.png', width: 700 },
      { src: 'images/class-site-coffee.png', width: 200 },
      { src: 'images/class-site-glasses.png', width: 250 },
      { src: 'images/class-site-mouse.png', width: 175 },
      { src: 'images/class-site-notebook.png', width: 175 },
      { src: 'images/class-site-pencil.png', width: 80 },
  
      // 🔗 NEW hover-linkable images:
      {
        src: 'images/class-site-book.png',
        hoverSrc: 'images/class-site-book-hover.png',
        width: 300,
        link: 'project-1/index.html'
      },
      {
        src: 'images/class-site-poster.png',
        hoverSrc: 'images/class-site-poster-hover.png',
        width: 300,
        link: 'project-2/index.html'
      },
      {
        src: 'images/class-site-tool.png',
        hoverSrc: 'images/class-site-tool-hover.png',
        width: 300,
        link: 'project-3/build.html'
      },
      {
        src: 'images/class-site-clock.png',
        hoverSrc: 'images/class-site-clock-hover.png',
        width: 300,
        link: 'https://solar-eclipse-countdown.netlify.app/'
      }
    ];
  
    imageData.forEach((data) => {
      const img = document.createElement('img');
      img.src = data.src;
      img.classList.add('draggable');
      img.style.width = `${data.width}px`;
      img.style.position = 'absolute';
  
      // Randomized starting position
      const maxX = window.innerWidth - data.width;
      const maxY = window.innerHeight - data.width;
      const randX = Math.floor(Math.random() * maxX);
      const randY = Math.floor(Math.random() * maxY);
      img.style.left = `${randX}px`;
      img.style.top = `${randY}px`;
  
      // 🔄 Hover effect
      if (data.hoverSrc) {
        img.addEventListener('mouseenter', () => {
          img.src = data.hoverSrc;
        });
        img.addEventListener('mouseleave', () => {
          img.src = data.src;
        });
      }
  
      // 🔗 Link behavior
      if (data.link) {
        img.addEventListener('click', () => {
          window.open(data.link, '_blank');
        });
      }
  
      // 🖱️ Drag behavior
      let isDragging = false;
  
      img.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
  
        const shiftX = e.clientX - img.getBoundingClientRect().left;
        const shiftY = e.clientY - img.getBoundingClientRect().top;
  
        function moveAt(pageX, pageY) {
          const maxX = window.innerWidth - img.offsetWidth;
          const maxY = window.innerHeight - img.offsetHeight;
  
          let newX = pageX - shiftX;
          let newY = pageY - shiftY;
  
          newX = Math.max(0, Math.min(newX, maxX));
          newY = Math.max(0, Math.min(newY, maxY));
  
          img.style.left = newX + 'px';
          img.style.top = newY + 'px';
        }
  
        function onMouseMove(e) {
          if (isDragging) {
            moveAt(e.pageX, e.pageY);
          }
        }
  
        document.addEventListener('mousemove', onMouseMove);
  
        document.addEventListener('mouseup', () => {
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
      });
  
      img.ondragstart = () => false;
      dropZone.appendChild(img);
    });
  });
  