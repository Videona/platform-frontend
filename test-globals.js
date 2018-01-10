// Global jasmine utils
// Becouse of how Jasmine works, there are some utils that can only be
// initialized one time, or it will fail. To avoid failures, we initialize
// that kind of things here.

// Jasmine clock
jasmine.clock().install();
