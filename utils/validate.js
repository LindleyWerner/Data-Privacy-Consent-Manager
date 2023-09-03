export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
    if (emailPattern.test(email)) {
        return true;
    }
    return 'Please enter a valid email address.';
}

export function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    
    const startsWithLetter = /^[A-Za-z]/.test(name);
    const endsWithLetter = /[A-Za-z]$/.test(name);
    
    if (!namePattern.test(name) || !startsWithLetter || !endsWithLetter) {
      return 'A valid name contains only letters and spaces';
    }
    if (name.length < 3) {
        return 'Name must be at least 3 characters long';
    }

    return true;
}

export function validatePassword(password) {
    const pattern = /^\d{4}$/;
    if(!pattern.test(password)) {
        return 'Please enter a valid password'
    }
    return true;
}