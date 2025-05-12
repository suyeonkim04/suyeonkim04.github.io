document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
  

    const imageData = [
        { src: 'images/class-site-computer.png', width: 800 },
         { src: 'images/class-site-coffee.png', width: 300 },
      { src: 'images/class-site-glasses.png', width: 350 },
      { src: 'images/class-site-mouse.png', width: 250 },
      { src: 'images/class-site-notebook.png', width: 300 },
      { src: 'images/class-site-pencil.png', width: 100 }
    ];
  
    imageData.forEach((data) => {
      const img = document.createElement('img');
      img.src = data.src;
      img.classList.add('draggable');
      img.style.width = `${data.width}px`;
      img.style.position = 'absolute';
  
      const maxX = window.innerWidth - data.width;
      const maxY = window.innerHeight - data.width; 
      const randX = Math.floor(Math.random() * maxX);
      const randY = Math.floor(Math.random() * maxY);
  
      img.style.left = `${randX}px`;
      img.style.top = `${randY}px`;
  
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
  