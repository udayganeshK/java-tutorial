// Custom script to enable true expand/collapse toggle on sidebar topics
document.addEventListener('DOMContentLoaded', function() {
  // Find all navigation section labels (topic titles)
  const navSections = document.querySelectorAll('.md-nav__item--nested > .md-nav__link');
  
  navSections.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent default navigation
      e.preventDefault();
      
      // Get the parent nav item
      const parentItem = this.closest('.md-nav__item--nested');
      const navCheckbox = parentItem.querySelector('input[type="checkbox"]');
      
      if (navCheckbox) {
        // Toggle the checkbox which controls expand/collapse
        navCheckbox.checked = !navCheckbox.checked;
      }
    });
  });
});
