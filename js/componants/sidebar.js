export function sideBarToggel (){
    const sideContentWidth  = $('.sideBar-content').innerWidth();
    tochSwap();
    $('.fa-bars, .fa-close').click(function() {
        const sideLeft = parseFloat($('#sideBar').css('left'));
        if (sideLeft === 0) {
            hideSidebar();
        } else {
            showSidebar();
        }

    });

    function animateSidebar(toPosition, duration, callback) {
    $('#sideBar').animate({ left: toPosition }, duration, callback);
}
function animateSidebarItems(toPosition, duration) {
    $('#sideBarItems li').each(function(index) {
        $(this).animate({ top: toPosition }, duration * (index + 1));
    });
}
function showSidebar() {
    animateSidebar(0, 700);
    animateSidebarItems(0, 100);
    $('.fa-close').show();
    $('.fa-bars').hide();
}
function hideSidebar() {
    animateSidebar(-sideContentWidth - 2, 700, function() {
        animateSidebarItems("100%", 100);});
    $('.fa-close').hide();
    $('.fa-bars').show();
}
function tochSwap(){
    const sideBar = document.getElementById('sideBar'); 
    const af = new AlloyFinger(sideBar, {
    swipe: function (evt) {
        if (evt.direction === 'Right') {
            showSidebar();
        } else if (evt.direction === 'Left') {
            hideSidebar();
        }
    }
});
}
window.onload = () => {
    animateSidebar(-sideContentWidth - 2, 700);
}

}
sideBarToggel()