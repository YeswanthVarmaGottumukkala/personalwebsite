const scrollContainer = document.getElementById("scroll-container");
const flowchartItems = document.querySelectorAll(".flowchart-item");
const contentBoxes = document.querySelectorAll(".content-box");

let scrollProgress = 0; // Accumulated scroll value
const stepSize = 200; // Pixels for each scroll movement
const contentWidth = contentBoxes[0].offsetWidth + 40; // Total width of a single content box including gap

window.addEventListener("wheel", (event) => {
    // Update scroll progress
    scrollProgress += event.deltaY;

    // Ensure scroll stays within bounds
    const maxScroll = (contentBoxes.length - 1) * contentWidth;
    scrollProgress = Math.max(0, Math.min(scrollProgress, maxScroll));

    // Move content boxes
    const translateX = -scrollProgress;
    scrollContainer.style.transform = `translateX(${translateX}px)`;

    // Move background image in the opposite direction
    const backgroundTranslate = scrollProgress * 0.1; // Background moves slower
    document.body.style.backgroundPosition = `center ${-backgroundTranslate}px`;

    // Highlight the flowchart step when a content box is in position
    const index = Math.round(scrollProgress / contentWidth);
    flowchartItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
});
