// An example of the module pattern to use with querying anything related to this object (I.e Credit cards).
// Together with es6 getter stuffs (wooh!)
class Example {
    get someGetter () {
        console.log('bla');
        return 'bla';
    }

    get pointers () {
        return {
            someGetter: this.someGetter,
        };
    }
}

export default Example().pointers;