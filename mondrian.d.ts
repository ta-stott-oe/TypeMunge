declare module 'mondrian' {
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/flot/jquery.flot.d.ts" />
/// <reference path="typings/jsgrid/jsgrid.d.ts" />
/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/bootstrap/bootstrap.d.ts" />
/// <reference path="typings/d3/d3.d.ts" />
/// <reference path="typings/q/q.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="typings/highcharts/highcharts.d.ts" />
/// <reference path="typings/highcharts/highmaps.d.ts" />
/// <reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
module Logger {
    enum LogLevel {
        Debug = 0,
        Info = 1,
        Warn = 2,
        Error = 3,
    }
    function SetLevel(level: LogLevel): void;
    function Log(level: LogLevel, message: any): void;
    function Debug(message: any): void;
    function Info(message: any): void;
    function Warn(message: any): void;
    function Error(message: any): void;
}
module Charts.SimpleChartModule {
    class SimpleChartBuilder implements IChartBuilder {
        Name: string;
        Build(container: JQuery): IChart;
    }
    class SimpleChartConfiguration {
    }
    class SimpleChart {
        Name: string;
        constructor(container: JQuery, config: SimpleChartConfiguration);
        Draw(provider: Slicers.ISlicer, context: Utilities.SynchronizationContext): void;
    }
}
class RenderingOptions {
    IsModalView: boolean;
    constructor(IsModalView: boolean);
}
interface IChart {
    Draw(provider: Slicers.ISlicer, context: Utilities.SynchronizationContext, renderingOptions?: RenderingOptions): void;
}
interface IChartBuilder {
    Name: string;
    Build(container: JQuery): IChart;
}
module Charts.FlotChartModule {
    class FlotChartConfiguration {
        maxResults: number;
        constructor(maxResults?: number);
    }
    class FlotChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: FlotChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Charts.D3MatrixChartModule {
    class D3MatrixChartConfiguration {
        maxResults: number;
        constructor(maxResults?: number);
    }
    class D3MatrixChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: D3MatrixChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Charts.JsGridChartModule {
    class JsGridChartConfiguration {
        maxResults: number;
        constructor(maxResults?: number);
    }
    class JsGridChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: JsGridChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Charts.D3ChartModule {
    class D3ChartConfiguration {
        maxResults: number;
        constructor(maxResults?: number);
    }
    class D3ChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: D3ChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
class Dimension {
    Code: string;
    Name: string;
    constructor(Code: string, Name?: string);
}
interface DimensionValues {
    [dimension: string]: DimensionValue;
}
class DimensionValue {
    Code: string;
    Name: string;
    constructor(Code: string, Name?: string);
}
interface FrequencyEnum {
    'A frequency': FrequencyEnum;
}
interface String {
    'A frequency': FrequencyEnum;
}
var Frequencies: {
    Annual: FrequencyEnum;
    Quarterly: FrequencyEnum;
    Both: FrequencyEnum;
};
class GeoJsonDto {
    GeoJsonData: any;
    BoundingBox: number[];
    constructor(GeoJsonData: any, BoundingBox: number[]);
}
interface IDataProvider {
    GetData(dimensions: {
        [dimension: string]: DimensionValue[];
    }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
    GetDimensions(): Q.Promise<Dimension[]>;
    GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
}
interface IMapDataProvider {
    GetMapData(): Q.Promise<GeoJsonDto>;
    GetMapData(regionCodes: string[]): Q.Promise<GeoJsonDto>;
}
module Utilities {
    class SynchronizationContext {
        private deferreds;
        private isRejected;
        private reason;
        constructor();
        Wrap<T>(promise: Q.Promise<T>): Q.Promise<T>;
        Reject(reason: any): void;
    }
}
interface ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class NopTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class PyTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class DyTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class DTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class PTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
}
class GrTransformation implements ITransformation {
    Name: string;
    Transform(period: Data.YearQuarter, source: Data.Dataseries): number;
    private SignedPow(x, y);
}
class TransformationLookup {
    private static allTransformations;
    private static annualTransformations;
    static GetTransformation(name: string): ITransformation;
    static GetTransformations(names?: string[]): ITransformation[];
    static GetTransformationsByFrequency(frequency: FrequencyEnum): ITransformation[];
}
module Data {
    class MetaData {
        Description: string;
        Location: string;
        DatabankName: string;
        ScaleFactor: string;
        AuthorEmail: string;
        Author: string;
        AuthorTelephone: string;
        HistoricalEndYear: number;
        HistoricalEndQuarter: number;
        BaseYearPrice: string;
        LastUpdate: string;
        SeasonallyAdjusted: boolean;
        SectorCoverage: string;
        SourceDetails: string;
        Units: string;
        Source: string;
        AdditionalSourceDetails: string;
        MeasureName: string;
        AnnualTypeCode: string;
        HasQuarterly: string;
        CategoryDescription: string;
        ImposedEndYear: number;
        ImposedEndQuarter: number;
        BaseYearIndex: string;
        constructor(Description: string, Location: string, DatabankName: string, ScaleFactor: string, AuthorEmail: string, Author: string, AuthorTelephone: string, HistoricalEndYear: number, HistoricalEndQuarter: number, BaseYearPrice: string, LastUpdate: string, SeasonallyAdjusted: boolean, SectorCoverage: string, SourceDetails: string, Units: string, Source: string, AdditionalSourceDetails: string, MeasureName: string, AnnualTypeCode: string, HasQuarterly: string, CategoryDescription: string, ImposedEndYear?: number, ImposedEndQuarter?: number, BaseYearIndex?: string);
    }
    class YearQuarter {
        private year;
        private quarter;
        constructor(year: number, quarter?: number);
        Year(): number;
        Quarter(): number;
        PreviousYear(): YearQuarter;
        toString(): string;
        PreviousQuarter(): YearQuarter;
        NextYear(): YearQuarter;
        NextQuarter(): YearQuarter;
    }
    class InMemoryDataSeries {
        Dimensions: {
            [dimension: string]: string;
        };
        Data: number[];
        StartYear: number;
        IsQuarterly: boolean;
        EndYear: number;
        constructor(Dimensions: {
            [dimension: string]: string;
        }, Data: number[], StartYear: number, IsQuarterly?: boolean);
        private calculateEndYear();
    }
    class Dataseries {
        Dimensions: {
            [dimension: string]: DimensionValue;
        };
        Data: number[];
        StartYear: number;
        IsQuarterly: boolean;
        MetaData: MetaData;
        static Create(dimensions: {
            [dimension: string]: string;
        }, data: number[], startYear: number, isQuarterly: boolean): Dataseries;
        EndYear: number;
        constructor(Dimensions: {
            [dimension: string]: DimensionValue;
        }, Data: number[], StartYear: number, IsQuarterly: boolean, MetaData: MetaData);
        private calculateEndYear();
        Get(period: YearQuarter): number;
        GetPeriods(): Array<YearQuarter>;
        GetLocationCode(): string;
        GetDimensionNames(): string[];
        IntersectsRange(startYear: number, endYear: number): boolean;
        Trim(startYear: number, endYear: number): Dataseries;
        PY(): Dataseries;
        Subtract(sub: Dataseries): Dataseries;
        Transform(transformer: ITransformation): Dataseries;
        Map(func: (year: YearQuarter, series: Dataseries) => number): Dataseries;
    }
}
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
module collections {
    /**
    * Function signature for comparing
    * <0 means a is smaller
    * = 0 means they are equal
    * >0 means a is larger
    */
    interface ICompareFunction<T> {
        (a: T, b: T): number;
    }
    /**
    * Function signature for checking equality
    */
    interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }
    /**
    * Function signature for Iterations. Return false to break from loop
    */
    interface ILoopFunction<T> {
        (a: T): boolean;
    }
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare<T>(a: T, b: T): number;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals<T>(a: T, b: T): boolean;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item: any): string;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString<T>(item: T, join?: string): string;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func: any): boolean;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj: any): boolean;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj: any): boolean;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T>;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    module arrays {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals<T>(array1: T[], array2: T[], equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy<T>(array: T[]): T[];
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap<T>(array: T[], i: number, j: number): boolean;
        function toString<T>(array: T[]): string;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach<T>(array: T[], callback: (item: T) => boolean): void;
    }
    interface ILinkedListNode<T> {
        element: T;
        next: ILinkedListNode<T>;
    }
    class LinkedList<T> {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        firstNode: ILinkedListNode<T>;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        private lastNode;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        private nElements;
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        constructor();
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        add(item: T, index?: number): boolean;
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        first(): T;
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        last(): T;
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        elementAtIndex(index: number): T;
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number;
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Removes all of the elements from this list.
         */
        clear(): void;
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        equals(other: LinkedList<T>, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
        * @private
        */
        private equalsAux(n1, n2, eqF);
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        removeElementAtIndex(index: number): T;
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: (item: T) => boolean): void;
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        reverse(): void;
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        toArray(): T[];
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        size(): number;
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        isEmpty(): boolean;
        toString(): string;
        /**
         * @private
         */
        private nodeAtIndex(index);
        /**
         * @private
         */
        private createNode(item);
    }
    interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }
    class Dictionary<K, V> {
        /**
         * Object holding the key-value pairs.
         * @type {Object}
         * @private
         */
        protected table: {
            [key: string]: IDictionaryPair<K, V>;
        };
        /**
         * Number of elements in the list.
         * @type {number}
         * @private
         */
        protected nElements: number;
        /**
         * Function used to convert keys to strings.
         * @type {function(Object):string}
         * @protected
         */
        protected toStr: (key: K) => string;
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction?: (key: K) => string);
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key: K): V;
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key: K, value: V): V;
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key: K): V;
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values(): V[];
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        forEach(callback: (key: K, value: V) => any): void;
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        containsKey(key: K): boolean;
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        clear(): void;
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size(): number;
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty(): boolean;
        toString(): string;
    }
    class LinkedDictionary<K, V> extends Dictionary<K, V> {
        private head;
        private tail;
        constructor(toStrFunction?: (key: K) => string);
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        private appendToTail(entry);
        /**
         * Retrieves a linked dictionary from the table internally
         */
        private getLinkedDictionaryPair(key);
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key: K): V;
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key: K): V;
        /**
        * Removes all mappings from this LinkedDictionary.
        * @this {collections.LinkedDictionary}
        */
        clear(): void;
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        private replace(oldPair, newPair);
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key: K, value: V): V;
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        values(): V[];
        /**
        * Executes the provided function once for each key-value pair
        * present in this LinkedDictionary. It is done in the order of insertion
        * into the LinkedDictionary
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        forEach(callback: (key: K, value: V) => any): void;
    }
    class MultiDictionary<K, V> {
        private dict;
        private equalsF;
        private allowDuplicate;
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues?: boolean);
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        getValue(key: K): V[];
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        setValue(key: K, value: V): boolean;
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        remove(key: K, value?: V): boolean;
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values(): V[];
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        containsKey(key: K): boolean;
        /**
         * Removes all mappings from this dictionary.
         */
        clear(): void;
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size(): number;
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty(): boolean;
    }
    class Heap<T> {
        /**
         * Array used to store the elements od the heap.
         * @type {Array.<Object>}
         * @private
         */
        private data;
        /**
         * Function used to compare elements.
         * @type {function(Object,Object):number}
         * @private
         */
        private compare;
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        private leftChildIndex(nodeIndex);
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        private rightChildIndex(nodeIndex);
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        private parentIndex(nodeIndex);
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        private minIndex(leftChild, rightChild);
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        private siftUp(index);
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        private siftDown(nodeIndex);
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        peek(): T;
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        add(element: T): boolean;
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        removeRoot(): T;
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        contains(element: T): boolean;
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        size(): number;
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this heap.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: (item: T) => boolean): void;
    }
    class Stack<T> {
        /**
         * List containing the elements.
         * @type collections.LinkedList
         * @private
         */
        private list;
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        constructor();
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        push(elem: T): boolean;
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        add(elem: T): boolean;
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        pop(): T;
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        peek(): T;
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        size(): number;
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this stack.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class Queue<T> {
        /**
         * List containing the elements.
         * @type collections.LinkedList
         * @private
         */
        private list;
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        constructor();
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        enqueue(elem: T): boolean;
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        add(elem: T): boolean;
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        dequeue(): T;
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        peek(): T;
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        size(): number;
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this queue.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class PriorityQueue<T> {
        private heap;
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        enqueue(element: T): boolean;
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        add(element: T): boolean;
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        dequeue(): T;
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        peek(): T;
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        size(): number;
        /**
         * Removes all of the elements from this priority queue.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class Set<T> {
        private dictionary;
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        constructor(toStringFunction?: (item: T) => string);
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        has(element: T): boolean;
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        add(element: T): boolean;
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        intersection(otherSet: Set<T>): void;
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        union(otherSet: Set<T>): void;
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        difference(otherSet: Set<T>): void;
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        isSubsetOf(otherSet: Set<T>): boolean;
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        remove(element: T): boolean;
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: (value: T) => void): void;
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        toArray(): T[];
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        size: number;
        /**
         * Removes all of the elements from this set.
         */
        clear(): void;
        toString(): string;
    }
    class Bag<T> {
        private toStrF;
        private dictionary;
        private nElements;
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction?: (item: T) => string);
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        add(element: T, nCopies?: number): boolean;
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        count(element: T): number;
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        remove(element: T, nCopies?: number): boolean;
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        toArray(): T[];
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        toSet(): Set<T>;
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        size(): number;
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this bag.
         */
        clear(): void;
    }
    class BSTree<T> {
        private root;
        private compare;
        private nElements;
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        add(element: T): boolean;
        /**
         * Removes all of the elements from this tree.
         */
        clear(): void;
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        size(): number;
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        remove(element: T): boolean;
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        inorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        preorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        postorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        levelTraversal(callback: ILoopFunction<T>): void;
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        minimum(): T;
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        maximum(): T;
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        toArray(): T[];
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        height(): number;
        /**
        * @private
        */
        private searchNode(node, element);
        /**
        * @private
        */
        private transplant(n1, n2);
        /**
        * @private
        */
        private removeNode(node);
        /**
        * @private
        */
        private inorderTraversalAux(node, callback, signal);
        /**
        * @private
        */
        private levelTraversalAux(node, callback);
        /**
        * @private
        */
        private preorderTraversalAux(node, callback, signal);
        /**
        * @private
        */
        private postorderTraversalAux(node, callback, signal);
        /**
        * @private
        */
        private minimumAux(node);
        /**
        * @private
        */
        private maximumAux(node);
        /**
          * @private
          */
        private heightAux(node);
        private insertNode(node);
        /**
        * @private
        */
        private createNode(element);
    }
}
module Slicers {
    interface ISlicer {
        GetData(page?: number, pageSize?: number): Q.Promise<Data.Dataseries[]>;
        Slice(dimension: string, dimensionValues: DimensionValue[]): ISlicer;
        SliceYearRange(startYear: number, endYear: number): ISlicer;
        SliceFrequency(frequency: FrequencyEnum): ISlicer;
        Transform(transformation: ITransformation): ISlicer;
        GetFreeDimensions(): Q.Promise<Dimension[]>;
        GetAllDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        GetStartYear(): number;
        GetEndYear(): number;
        GetFrequency(): FrequencyEnum;
    }
    class SynchronizedSlicer implements ISlicer {
        private source;
        private context;
        constructor(source: ISlicer, context: Utilities.SynchronizationContext);
        GetData(page?: number, pageSize?: number): Q.Promise<Data.Dataseries[]>;
        Slice(dimension: string, dimensionValues: DimensionValue[]): ISlicer;
        SliceYearRange(startYear: number, endYear: number): ISlicer;
        SliceFrequency(frequency: FrequencyEnum): ISlicer;
        Transform(transformation: ITransformation): ISlicer;
        GetFreeDimensions(): Q.Promise<Dimension[]>;
        GetAllDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        GetStartYear(): number;
        GetEndYear(): number;
        GetFrequency(): FrequencyEnum;
    }
    class Slicer implements ISlicer {
        Dimensions: {
            [dimension: string]: DimensionValue[];
        };
        private source;
        private freeDimensions;
        private transformation;
        private frequency;
        private startYear;
        private endYear;
        static Create(source: IDataProvider, freeDimensions: Array<string>, transformation?: ITransformation, dimensions?: {
            [dimension: string]: string[];
        }, frequency?: FrequencyEnum, startYear?: number, endYear?: number): Slicer;
        constructor(source: IDataProvider, freeDimensions: Q.Promise<Dimension[]>, transformation: ITransformation, dimensions: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number);
        GetStartYear(): number;
        GetEndYear(): number;
        GetFrequency(): FrequencyEnum;
        GetData(page?: number, pageSize?: number): Q.Promise<Data.Dataseries[]>;
        Slice(dimension: string, dimensionValue: DimensionValue[]): ISlicer;
        SliceYearRange(startYear: number, endYear: number): ISlicer;
        SliceFrequency(frequency: FrequencyEnum): ISlicer;
        private CopyDimensions(dimensionsToCopy);
        GetFreeDimensions(): Q.Promise<Dimension[]>;
        GetAllDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        Transform(transformation: ITransformation): ISlicer;
    }
}
interface String {
    'A ControlType': Dashboards.ControlType;
}
interface String {
    'A MutatorType': Dashboards.MutatorType;
}
interface String {
    'A ControlPosition': Dashboards.ControlPosition;
}
module Dashboards {
    interface IMessageProvider {
        ShowMessage(message: string): void;
    }
    class SimpleMessage implements IMessageProvider {
        ShowMessage(message: string): void;
    }
    interface ISlicerProvider {
        GetSlicer(): Q.Promise<Slicers.ISlicer>;
        Subscribe(callback: () => void): void;
        Unsubscribe(callback: () => void): void;
        OnUpdate(): void;
    }
    class Subscribable {
        private callbacks;
        OnUpdate(): void;
        Subscribe(callback: () => void): void;
        Unsubscribe(callback: () => void): void;
    }
    class DirectSlicerProvider extends Subscribable implements ISlicerProvider {
        private slicer;
        constructor(slicer: Slicers.ISlicer);
        GetSlicer(): Q.Promise<Slicers.ISlicer>;
    }
    class SlicerProvider extends Subscribable implements ISlicerProvider {
        private source;
        private filters;
        constructor(source: ISlicerProvider, filters: ISlicerMutator[]);
        GetSlicer(): Q.Promise<Slicers.ISlicer>;
    }
    interface ISlicerMutator {
        MutatorType: MutatorType;
        Apply(slicer: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
    }
    interface ControlType {
        'A ControlType': ControlType;
    }
    var ControlTypes: {
        MultiSelect: ControlType;
        Select: ControlType;
        Select2: ControlType;
        BootstrapSelect: ControlType;
        ChosenMultiselect: ControlType;
    };
    interface MutatorType {
        'A MutatorType': MutatorType;
    }
    var MutatorTypes: {
        DimensionFilter: MutatorType;
        Transformer: MutatorType;
        YearRange: MutatorType;
        FrequencyFilter: MutatorType;
        YearFilter: MutatorType;
    };
    interface ControlPosition {
        'A ControlPosition': ControlPosition;
    }
    var ControlPositions: {
        Top: ControlPosition;
        Bottom: ControlPosition;
        Right: ControlPosition;
        Left: ControlPosition;
    };
    class ControlPresentation {
        UiControlType: ControlType;
        Position: ControlPosition;
        LabelIsHidden: boolean;
        IsHidden: boolean;
        constructor(UiControlType: ControlType, Position: ControlPosition, LabelIsHidden: boolean, IsHidden: boolean);
    }
    class FilterViewModel {
        private filter;
        AllOptions: KnockoutObservableArray<DimensionValue>;
        SelectedOption: KnockoutObservable<DimensionValue>;
        constructor(filter: Filter);
    }
    class TransformViewModel {
        private filter;
        AllOptions: KnockoutObservableArray<ITransformation>;
        SelectedOption: KnockoutObservable<ITransformation>;
        constructor(filter: Transformer);
    }
    class WidgetBase {
    }
    class WidgetContainer {
        Heading: string;
        SubHeading: string;
        Type: string;
        WidgetSettings: Providers.WidgetDataProvider.WidgetSettings;
        Controls: ISlicerMutator[];
        Widgets: WidgetContainer[];
        constructor(Heading: string, SubHeading: string, Type: string, WidgetSettings: Providers.WidgetDataProvider.WidgetSettings, Controls: ISlicerMutator[], Widgets: WidgetContainer[]);
    }
    class ChartWidget extends WidgetContainer {
        protected container: JQuery;
        Builder: IChartBuilder;
        Provider: ISlicerProvider;
        WidgetSettings: Providers.WidgetDataProvider.WidgetSettings;
        constructor(heading: string, subHeading: string, container: JQuery, Builder: IChartBuilder, Provider: ISlicerProvider, WidgetSettings: Providers.WidgetDataProvider.WidgetSettings, filters?: Filter[]);
    }
    class DirectChartWidget extends ChartWidget {
        constructor(name: string, subHeading: string, container: JQuery, builder: IChartBuilder, providers: ISlicerProvider, widgetSettings: Providers.WidgetDataProvider.WidgetSettings, filters?: Filter[]);
        protected Draw(): void;
    }
}
interface String {
    'A ControlConfigurationType': Providers.WidgetDataProvider.ControlConfigurationType;
}
interface String {
    'A WidgetType': Providers.WidgetDataProvider.WidgetType;
}
module Providers.WidgetDataProvider {
    interface ControlConfigurationType {
        'A ControlConfigurationType': ControlConfigurationType;
    }
    var ControlConfigurationTypes: {
        Filter: ControlConfigurationType;
        Transformer: ControlConfigurationType;
        YearRange: ControlConfigurationType;
        YearFilter: ControlConfigurationType;
        FrequencyFilter: ControlConfigurationType;
    };
    class ControlConfiguration {
        Providers: number[];
        IsHidden: boolean;
        UiControlType: Dashboards.ControlType;
        Position: Dashboards.ControlPosition;
        LabelIsHidden: boolean;
        Type: ControlConfigurationType;
        constructor(Providers: number[], IsHidden: boolean, UiControlType: Dashboards.ControlType, Position: Dashboards.ControlPosition, LabelIsHidden: boolean, Type: ControlConfigurationType);
    }
    class TransformerConfiguration extends ControlConfiguration {
        Transformation: string[];
        TransformationValueOptions: string[];
        constructor(providers: number[], isHidden: boolean, Transformation?: string[], TransformationValueOptions?: string[], uiControlType?: Dashboards.ControlType, position?: Dashboards.ControlPosition, labelIsHidden?: boolean);
    }
    class FrequencyFilterConfiguration extends ControlConfiguration {
        Frequency: FrequencyEnum;
        constructor(providers: number[], isHidden: boolean, Frequency?: FrequencyEnum, uiControlType?: Dashboards.ControlType, position?: Dashboards.ControlPosition, labelIsHidden?: boolean);
    }
    class YearFilterConfiguration extends ControlConfiguration {
        SelectedYear: number;
        StartYearOption: number;
        EndYearOption: number;
        RecalulateYearsRelativeToYear: number;
        constructor(providers: number[], isHidden: boolean, SelectedYear?: number, StartYearOption?: number, EndYearOption?: number, RecalulateYearsRelativeToYear?: number, uiControlType?: Dashboards.ControlType, position?: Dashboards.ControlPosition, labelIsHidden?: boolean);
        static SetDefaultsAndRelativeYears(yControl: YearFilterConfiguration): void;
    }
    class YearRangeConfiguration extends ControlConfiguration {
        SelectedStartYear: number;
        SelectedEndYear: number;
        StartYearOption: number;
        EndYearOption: number;
        RecalulateYearsRelativeToYear: number;
        constructor(providers: number[], isHidden: boolean, SelectedStartYear?: number, SelectedEndYear?: number, StartYearOption?: number, EndYearOption?: number, RecalulateYearsRelativeToYear?: number, uiControlType?: Dashboards.ControlType, position?: Dashboards.ControlPosition, labelIsHidden?: boolean);
        static SetDefaultsAndRelativeYears(yrControl: YearRangeConfiguration): void;
    }
    class FilterConfiguration extends ControlConfiguration {
        Dimension: Dimension;
        DimensionValues: DimensionValue[];
        DimensionValueOptions: DimensionValue[];
        constructor(Dimension: Dimension, isHidden: boolean, inheritted: boolean, providers: number[], DimensionValues?: DimensionValue[], DimensionValueOptions?: DimensionValue[], controlType?: Dashboards.ControlType, position?: Dashboards.ControlPosition, labelIsHidden?: boolean);
    }
    class WidgetSettings {
        WidgetWidthColumns: number;
        CustomCSS: string;
        constructor(WidgetWidthColumns: number, CustomCSS?: string);
    }
    interface WidgetType {
        'A WidgetType': WidgetType;
    }
    var WidgetTypes: {
        GroupingWidget: WidgetType;
        HandsOnTable: WidgetType;
        FlotChart: WidgetType;
        HighChart: WidgetType;
        HighMap: WidgetType;
    };
    class WidgetConfiguration {
        Heading: string;
        SubHeading: string;
        Type: WidgetType;
        WidgetSettings: WidgetSettings;
        Controls: ControlConfiguration[];
        Widgets: WidgetConfiguration[];
        Provider: number;
        Id: string;
        constructor(Heading: string, SubHeading: string, Type: WidgetType, WidgetSettings: WidgetSettings, Controls: ControlConfiguration[], Widgets: WidgetConfiguration[], Provider: number, Id?: string);
    }
    class WidgetBuilder {
        static SingleWidget(heading: string, subHeading: string, widgetType: WidgetType, grouperWidgetSettings: WidgetSettings, controls: ControlConfiguration[], provider: number, id?: string, widgetSettings?: WidgetSettings): WidgetConfiguration;
    }
    class WidgetConfigurationProvider {
        private data;
        constructor(data: WidgetConfiguration);
        GetWidgets(slicers: Dashboards.ISlicerProvider[], mapProvider: IMapDataProvider): Dashboards.WidgetContainer;
    }
}
module Charts.HandsOnTableChartModule {
    class HandsOnTableChartConfiguration extends Providers.WidgetDataProvider.WidgetSettings {
        MaxResults: number;
        HiddenDimensions: Dimension[];
        constructor(WidgetWidthColumns: number, CustomCSS?: string, MaxResults?: number, HiddenDimensions?: Dimension[]);
    }
    class HandsOnTableChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        private defaultConfig;
        constructor(config: HandsOnTableChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Projection {
    class ProjectionResults {
        data: number[][];
        xHeader: HeaderKey[];
        yHeader: HeaderKey[];
        constructor(data: number[][], xHeader: HeaderKey[], yHeader: HeaderKey[]);
    }
    class HeaderKey {
        Prefix: string;
        Axes: Dimension[];
        DimensionValues: DimensionValue[];
        private dimensionValueLookup;
        constructor(Prefix: string, Axes: Dimension[], DimensionValues: DimensionValue[]);
        GetDimensionValue(dimensionCode: string): DimensionValue;
    }
    class Projector {
        private data;
        constructor(data: Data.Dataseries[]);
        Project(xAxis: Dimension[], yAxis: Dimension[]): ProjectionResults;
        private CreateHeaderKey(axes, series, period);
        private ConvertSetToSortedArray1(input);
        private CreateIndexLookup(axisHeaderArray);
    }
}
module Charts.HtmlGridChartModule {
    class HtmlGridChartConfiguration {
        maxResults: number;
        constructor(maxResults?: number);
    }
    class HtmlGridChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: HtmlGridChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Charts.HtmlTableGridChartModule {
    class HtmlTableGridChartConfiguration {
        xAxis: string[];
        yAxis: string[];
        groupBy: string;
        maxResults: number;
        constructor(xAxis: string[], yAxis: string[], groupBy?: string, maxResults?: number);
    }
    class HtmlTableGridChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: HtmlTableGridChartConfiguration);
        Build(container: JQuery): IChart;
    }
}
module Charts.HighChartModule {
    class YAxisConfig {
        YAxisName: string;
        Dimensions: DimensionValue[];
        ChartType: string;
        AxisNumber: number;
        constructor(YAxisName: string, Dimensions: DimensionValue[], ChartType: string, AxisNumber: number);
    }
    class Configuration extends Providers.WidgetDataProvider.WidgetSettings {
        DefaultNumberOfAxes: number;
        YAxisConfigurations: YAxisConfig[];
        MaxResults: number;
        DefaultChartType: string;
        ShowGridLines: boolean;
        constructor(widgetWidthColumns: number, customCss?: string, DefaultNumberOfAxes?: number, YAxisConfigurations?: YAxisConfig[], MaxResults?: number, DefaultChartType?: string, ShowGridLines?: boolean);
    }
    class HighChartBuilder implements IChartBuilder {
        private config;
        Name: string;
        constructor(config: Configuration);
        Build(container: JQuery): IChart;
    }
}
module Samples {
    class Application {
        Start(): void;
    }
    class Application2 {
        Start(series: Array<Data.InMemoryDataSeries>): void;
    }
    class Application3 {
        Start(): void;
    }
    class Application4 {
        Start(series: Array<Data.InMemoryDataSeries>): void;
    }
    class Application5 {
        Start(): void;
    }
    class Application6 {
        Start(filename?: string): void;
    }
    class Application7 {
        Start(): void;
    }
    class Dashboard {
        Start(filename?: string): void;
    }
}
var filter5: any;
var filter2: any;
module Samples2 {
    class DashboardExample {
        Start(): void;
        Init(sources: IDataProvider[]): void;
        private CreateChartDomElement(container);
    }
}
interface JQuery {
    select2: (parameters: any, moreparameters?: any) => JQuery;
    chosen: (parameters: any) => JQuery;
}
interface JQuery {
    selectpicker: (parameters?: any, parameters2?: any, parameters3?: any) => void;
}
interface KnockoutBindingHandlers {
    WidgetBindingHandler: KnockoutBindingHandler;
    CustomStyleBindingHandler: KnockoutBindingHandler;
}
class AllBindingsCompatibilityHelper {
    private koAllBindings;
    constructor(koAllBindings: any);
    has(name: string): boolean;
    get(name: string): any;
}
module BindingHandlers {
}
module Extenders {
}
module Charts.CogChartModule {
    class CogChart {
        private _width;
        private _height;
        private _radius;
        private _speed;
        private _offset;
        private _outerRingVisible;
        private _smallCogToothCount;
        private _numberOfCogs;
        private _containerRef;
        constructor();
        render(): CogChart;
        width(value: number): any;
        height(value: number): any;
        radius(value: number): any;
        speed(value: number): any;
        offset(value: number): any;
        outerRingVisible(value: boolean): any;
        smallCogToothCount(value: number): any;
        containerRef(value: string): any;
    }
}
module Charts.HighMapModule {
    import IMessageProvider = Dashboards.IMessageProvider;
    class Configuration extends Providers.WidgetDataProvider.WidgetSettings {
        MapType: string;
        constructor(widgetWidthColumns: number, customCss?: string, MapType?: string);
    }
    class HighMapBuilder implements IChartBuilder {
        private config;
        private mapDataProvider;
        private messageProvider;
        Name: string;
        constructor(config: Configuration, mapDataProvider: IMapDataProvider, messageProvider: IMessageProvider);
        Build(container: JQuery): IChart;
    }
}
module Configuration {
    interface DashboardsConfiguration {
        DashboardProvider: DashboardDataProvider;
        Providers: IDataProvider[];
        MapProvider?: IMapDataProvider;
    }
    class Examples {
        private static GetDashboardWidgetConfigurations(dataProviders);
        static Dashboards(filename?: string): Q.Promise<DashboardsConfiguration>;
        static JulienneDashboard(julienneUrl: string): Q.Promise<DashboardsConfiguration>;
        static JsonDashboard(dataProvider: IDataProvider, dashboardConfigUrl: string, mapProvider?: IMapDataProvider): Q.Promise<DashboardsConfiguration>;
        static ComparisonDashboard(jsonUrl: string): Q.Promise<DashboardsConfiguration>;
    }
}
module Containers {
    class DashboardContainer {
        constructor(container: JQuery);
    }
}
module Containers {
    interface DashboardContainerFilter {
        GetSelectedValues(): DimensionValue[];
        GetAvailableValues(): DimensionValue[];
        SetSelection(values: DimensionValue[]): void;
        OnReady(callback: () => void): void;
    }
    interface DashboardSelectedCallback {
        (dashboard: DashboardDto): void;
    }
    class DashboardsContainer {
        private $element;
        private config;
        private viewModel;
        constructor($element: JQuery, config: Q.Promise<Configuration.DashboardsConfiguration>);
        OnDashboardSelected(callback: DashboardSelectedCallback): void;
        UpdateAllFilters(): Q.Promise<any>;
        GetFilter(dimension: string): DashboardContainerFilter;
        Start(initialDashboardName?: string, initialFilterValues?: {
            [dimension: string]: DimensionValue[];
        }): Q.Promise<any>;
    }
}
module Dashboards {
    class Filter implements ISlicerMutator {
        private providers;
        dimension: Dimension;
        Control: ControlPresentation;
        private explicitDimensionValueOptions;
        MutatorType: MutatorType;
        private dimensionValues;
        constructor(providers: ISlicerProvider[], dimension: Dimension, dimensionValues: DimensionValue[], Control: ControlPresentation, explicitDimensionValueOptions: DimensionValue[]);
        private GetDefaultDimensionValues();
        Slice(dimensionValues: DimensionValue[]): void;
        Apply(slicerPromise: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
        GetActiveDimensionValues(): Q.Promise<DimensionValue[]>;
        GetDimensionValueOptions(): Q.Promise<DimensionValue[]>;
    }
    class FrequencyFilter implements ISlicerMutator {
        private providers;
        Frequency: FrequencyEnum;
        MutatorType: MutatorType;
        constructor(providers: ISlicerProvider[], Frequency?: FrequencyEnum);
        SetFrequency(frequency: FrequencyEnum): void;
        Apply(slicerPromise: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
    }
    class FrequencyFilterControl extends FrequencyFilter {
        Control: ControlPresentation;
        MutatorType: MutatorType;
        constructor(providers: ISlicerProvider[], Control: ControlPresentation, frequency?: FrequencyEnum);
    }
    class Transformer extends Subscribable implements ISlicerMutator {
        private providers;
        TransformationValueOptions: ITransformation[];
        Transformation: ITransformation;
        MutatorType: MutatorType;
        private useAllTransformationValues;
        constructor(providers: ISlicerProvider[], TransformationValueOptions: ITransformation[], Transformation?: ITransformation);
        UpdateTranformationValueOptions(): void;
        Transform(newTransformation: ITransformation): void;
        Apply(slicerPromise: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
    }
    class TransformerControl extends Transformer {
        Control: ControlPresentation;
        MutatorType: MutatorType;
        constructor(providers: ISlicerProvider[], transformationValueOptions: ITransformation[], Control: ControlPresentation, transformation?: ITransformation);
    }
    class YearRangeControl implements ISlicerMutator {
        private providers;
        Control: ControlPresentation;
        StartYearOption: number;
        EndYearOption: number;
        SelectedStartYear: number;
        SelectedEndYear: number;
        MutatorType: MutatorType;
        constructor(providers: ISlicerProvider[], Control: ControlPresentation, StartYearOption: number, EndYearOption: number, SelectedStartYear?: number, SelectedEndYear?: number);
        SliceYears(startYear: number, endYear: number): void;
        Apply(slicerPromise: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
        GetYearRangeOptions(): number[];
        private calculateYearOptions(startYear, endYear);
    }
    class YearFilterControl implements ISlicerMutator {
        private providers;
        Control: ControlPresentation;
        StartYearOption: number;
        EndYearOption: number;
        SelectedYear: number;
        MutatorType: MutatorType;
        constructor(providers: ISlicerProvider[], Control: ControlPresentation, StartYearOption: number, EndYearOption: number, SelectedYear?: number);
        SliceYear(year: number): void;
        Apply(slicerPromise: Q.Promise<Slicers.ISlicer>): Q.Promise<Slicers.ISlicer>;
        GetYearRangeOptions(): number[];
        private calculateYearOptions(startYear, endYear);
    }
}
module Helpers {
    class DashboardStyleHelper {
        static UpdateDashboardStyle(document: HTMLDocument, cssText: string, idOfStyleElement?: string): void;
        private static insertStyleElement(document, cssText, idOfStyleElement?);
    }
}
module Helpers {
    class DimensionsHelper {
        static CreateDimensionValues(dimensions: string[]): Array<DimensionValue>;
    }
}
class InMemoryCoverage {
    private coverage;
    private dimensionValues;
    constructor();
    AddPoint(point: {
        [id: string]: string;
    }): void;
    AddDimensionalPoint(point: {
        [id: string]: DimensionValue;
    }): void;
    GetDimensionValues(dimensionCode: string): DimensionValue[];
    CheckPoint(point: string[]): boolean;
    private AddPermutations(left, right);
}
class DashboardDto {
    Name: string;
    RootWidgetId: string;
    constructor(name: string, rootWidgetId: string);
}
interface DashboardDataProvider {
    GetDashboards(): Q.Promise<DashboardDto[]>;
    GetWidgetConfigurationByRootId(id: string): Q.Promise<Providers.WidgetDataProvider.WidgetConfiguration>;
}
class InMemoryDashboardDataProvider {
    private dashboardData;
    private widgetConfigurationData;
    constructor(dashboardData?: DashboardDto[], widgetConfigurationData?: Providers.WidgetDataProvider.WidgetConfiguration[]);
    GetDashboards(): Q.Promise<DashboardDto[]>;
    GetWidgetConfigurationByRootId(id: string): Q.Promise<Providers.WidgetDataProvider.WidgetConfiguration>;
}
interface DashboardConfiguration extends Providers.WidgetDataProvider.WidgetConfiguration {
    Name: string;
}
class JsonDashboardDataProvider implements DashboardDataProvider {
    private url;
    private getDashboards;
    constructor(url: string);
    GetDashboards(): Q.Promise<DashboardDto[]>;
    GetWidgetConfigurationByRootId(id: string): Q.Promise<Providers.WidgetDataProvider.WidgetConfiguration>;
}
module DataProviders {
    class DataProvider {
        static GetInMemoryProvider(filename: string): Q.Promise<IDataProvider>;
        static GetOnDemandInMemoryProvider(filename: string): Q.Promise<IDataProvider>;
        static GetMandolineProvider(url: string, databankCode: string): Q.Promise<IDataProvider>;
        static GetJulienneProvider(url: string): Q.Promise<IDataProvider>;
    }
}
module DataProviders {
    class ForecastDataProvider implements IDataProvider {
        private baseUrl;
        constructor(baseUrl: string);
        GetData(dimensions: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
        private GetDataForBase(base, indicators, locations);
        private ToDataseries(forecastVariable, base);
        GetDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
    }
}
module DataProviders {
    class InMemoryDataProvider implements IDataProvider {
        private data;
        private dimensions;
        private coverage;
        constructor(data: Data.InMemoryDataSeries[], dimensions?: Dimension[]);
        GetData(slicers: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
        GetDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        GetCoverage(): InMemoryCoverage;
        GetIndex(): DataseriesIndex[];
        private filterRow(row, dimensions, dimensionNames);
    }
    interface DataseriesIndex {
        [dimension: string]: string;
    }
    class OnDemandInMemoryDataProvider implements IDataProvider {
        private index;
        private fetch;
        private dimensions;
        private coverage;
        constructor(index: DataseriesIndex[], fetch: (index: DataseriesIndex) => Q.Promise<Data.InMemoryDataSeries>, dimensions?: Dimension[]);
        private filterRow(index, dimensions, dimensionNames);
        GetData(slicers: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
        GetDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        GetCoverage(): InMemoryCoverage;
        GetIndex(): DataseriesIndex[];
    }
}
module DataProviders {
    class DataseriesDto {
        DatabankCode: string;
        ProductTypeCode: string;
        LocationCode: string;
        VariableCode: string;
        MeasureCode: string;
        Metadata: {
            [field: string]: string;
        };
        AnnualData: {
            [field: string]: number;
        };
        QuarterlyData: {
            [field: string]: number;
        };
    }
    class MandolineDataProvider implements IDataProvider, IMapDataProvider {
        protected baseUrl: string;
        protected apiKey: string;
        protected databankCode: string;
        protected defaultProductTypeCode: string;
        private InternalGetDataMemoized;
        constructor(baseUrl: string, apiKey: string, databankCode: string, defaultProductTypeCode?: string);
        protected GetDataSeriesDimensionValues(dataSeriesDto: DataseriesDto): DimensionValues;
        protected ToDataseries(dataSeriesDto: DataseriesDto): Data.Dataseries;
        GetData(dimensions: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
        private InternalGetData(dimensions, frequency, startYear, endYear, page, pageSize);
        private GetMemoizationKey(dimensions, frequency, startYear, endYear, page, pageSize);
        GetDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        GetMapData(regionCodes?: string[]): Q.Promise<GeoJsonDto>;
        protected QueryServer<ReturnType>(url: string, method: string, data?: any): Q.Promise<ReturnType>;
    }
}
module DataProviders {
    class JulienneDataProvider extends MandolineDataProvider {
        constructor(baseUrl: string, apiKey: string);
        GetData(dimensions: {
            [dimension: string]: DimensionValue[];
        }, frequency: FrequencyEnum, startYear: number, endYear: number, page: number, pageSize: number): Q.Promise<Data.Dataseries[]>;
        GetDimensions(): Q.Promise<Dimension[]>;
        GetDimensionValues(dimension: Dimension): Q.Promise<DimensionValue[]>;
        protected GetDataSeriesDimensionValues(dataSeriesDto: DataseriesDto): DimensionValues;
    }
}
class Databank {
    DatabankCode: string;
    Name: string;
    constructor(DatabankCode: string, Name: string);
}
class MandolineDatabankProvider {
    static GetDatabanks(baseUrl: string, apiKey: string): Q.Promise<Databank[]>;
}
class WidgetSlicer {
    private source;
    dimension: string;
    dimensionValues: DimensionValue[];
    private subscribers;
    private selectedDimensionValues;
    constructor(source: Slicers.ISlicer, dimension: string, dimensionValues: DimensionValue[]);
    Select(dimensionValue: DimensionValue): void;
    Subscribe(func: (source: Slicers.ISlicer) => void): void;
}
module Templates {
    var dashboard: string;
    var dashboards: string;
    var templates: string;
}
class WidgetContainerViewModel {
    OriginalWidgetObject: Dashboards.WidgetContainer;
    Heading: KnockoutObservable<string>;
    SubHeading: KnockoutObservable<string>;
    Type: KnockoutObservable<string>;
    WidgetSettings: WidgetSettingsViewModel;
    Widgets: KnockoutObservableArray<WidgetViewModel | WidgetContainerViewModel>;
    Filters: KnockoutObservableArray<ControlViewModel>;
    ControlColumnWidth: KnockoutComputed<number>;
    ControlColumnWidthClass: KnockoutComputed<string>;
    WidgetWidthClass: KnockoutComputed<string>;
    RightFilters: KnockoutComputed<ControlViewModel[]>;
    LeftFilters: KnockoutComputed<ControlViewModel[]>;
    BottomFilters: KnockoutComputed<ControlViewModel[]>;
    TopFilters: KnockoutComputed<ControlViewModel[]>;
    HeadingIsVisible: KnockoutComputed<boolean>;
    SubHeadingIsVisible: KnockoutComputed<boolean>;
    constructor(OriginalWidgetObject: Dashboards.WidgetContainer);
    private ToBootstrapWidthClass(width);
    private setupBootstrapColumnWidths();
    private setControlWidthTopAndBottom(newValue);
    private setFilterWidthLeftAndRight(newValue);
}
class WidgetViewModel extends WidgetContainerViewModel {
    Widget: Dashboards.ChartWidget;
    constructor(Widget: Dashboards.ChartWidget);
}
class AppViewModel {
    private dashboardDataProvider;
    private dataProviders;
    private mapProvider;
    RootWidget: KnockoutObservable<WidgetContainerViewModel>;
    Dashboards: KnockoutObservableArray<DashboardDto>;
    SelectedDashboard: KnockoutObservable<DashboardDto>;
    ModalWidget: KnockoutObservable<WidgetViewModel>;
    constructor(dashboardDataProvider: DashboardDataProvider, dataProviders: IDataProvider[], mapProvider?: IMapDataProvider, initialDashboardName?: string, initialFilterValues?: {
        [dimension: string]: DimensionValue[];
    });
    OnReady(callback: () => void): void;
    private setRootWidget(initialFilterValues);
    private getDashboards(initialDashboardName);
    OpenWidgetInModal: (widget: WidgetViewModel) => void;
}
import Dataseries = Data.Dataseries;
import FlotChartConfiguration = Charts.FlotChartModule.FlotChartConfiguration;
import FlotChartBuilder = Charts.FlotChartModule.FlotChartBuilder;
import HandsOnTableChartConfiguration = Charts.HandsOnTableChartModule.HandsOnTableChartConfiguration;
import HandsOnTableChartBuilder = Charts.HandsOnTableChartModule.HandsOnTableChartBuilder;
class ChartViewModel {
    private container;
    AllLocations: KnockoutObservableArray<DimensionValue>;
    AllIndicators: KnockoutObservableArray<DimensionValue>;
    AllTransformations: KnockoutObservableArray<string>;
    AllCharts: KnockoutObservableArray<IChartBuilder>;
    Locations: KnockoutObservable<string[]>;
    Indicators: KnockoutObservable<string[]>;
    Transformations: KnockoutObservable<string>;
    Charts: KnockoutObservable<string>;
    LocationsEnabled: KnockoutObservable<boolean>;
    IndicatorsEnabled: KnockoutObservable<boolean>;
    private coverage;
    private freeDimensions;
    private locationsArray;
    private indicatorsArray;
    private slicer;
    constructor(container: JQuery, builders: IChartBuilder[]);
    Update(slicer: Slicers.ISlicer, coverage: InMemoryCoverage, index: DataProviders.DataseriesIndex[], freeDimensions?: string[]): void;
    UpdateFromMandoline(source: DataProviders.MandolineDataProvider, freeDimensions?: string[]): void;
    private Update2(locations, indicators, source, coverage, freeDimensions, locationLookup, indicatorLookup);
    private Update3(locations, indicators, slicer, coverage, freeDimensions, locationLookup, indicatorLookup);
    private GetSlicer();
    private ToArray(items);
    private UpdateLocations(locationsArray);
    private UpdateIndicators(indicatorsArray);
    private IndicatorsArray();
    private LocationsArray();
    private EnsureArray(value);
    private RefreshChart(source);
}
class ControlViewModel {
    protected widgetViewModel: WidgetContainerViewModel;
    UiControlType: KnockoutObservable<Dashboards.ControlType>;
    FilterType: KnockoutObservable<Dashboards.MutatorType>;
    Position: KnockoutObservable<Dashboards.ControlPosition>;
    ControlWidthClass: KnockoutObservable<string>;
    Label: KnockoutObservable<string>;
    IsHidden: KnockoutObservable<boolean>;
    LabelIsHidden: KnockoutObservable<boolean>;
    Inheritted: KnockoutObservable<boolean>;
    DependentOnDimension: KnockoutObservable<string>;
    SelectOptionsCaption: KnockoutComputed<string>;
    constructor(isHidden: boolean, labelIsHidden: boolean, uiControlType: Dashboards.ControlType, position: Dashboards.ControlPosition, widgetViewModel: WidgetContainerViewModel, label: string, filterType: Dashboards.MutatorType, controlWidthClass?: string);
}
class FrequencyFilterViewModel extends ControlViewModel {
    private frequencyFilter;
    AllOptions: KnockoutObservableArray<any>;
    SelectedOption: KnockoutObservable<FrequencyEnum>;
    constructor(frequencyFilter: Dashboards.FrequencyFilterControl, widgetViewModel: WidgetContainerViewModel);
}
class TransformerViewModel extends ControlViewModel {
    private transformer;
    AllOptions: KnockoutObservableArray<ITransformation>;
    SelectedOption: KnockoutObservable<ITransformation>;
    constructor(transformer: Dashboards.TransformerControl, widgetViewModel: WidgetContainerViewModel);
    UpdateTransformationValueOptions(): void;
}
class YearRangeFilterViewModel extends ControlViewModel {
    private yearRangeSlicer;
    YearOptions: KnockoutObservableArray<number>;
    SelectedStartYear: KnockoutObservable<number>;
    SelectedEndYear: KnockoutObservable<number>;
    SliceYearRange: KnockoutComputed<void>;
    constructor(yearRangeSlicer: Dashboards.YearRangeControl, widgetViewModel: WidgetContainerViewModel);
}
class YearFilterViewModel extends ControlViewModel {
    private yearSlicer;
    YearOptions: KnockoutObservableArray<number>;
    SelectedYear: KnockoutObservable<number>;
    SliceYear: KnockoutComputed<void>;
    constructor(yearSlicer: Dashboards.YearFilterControl, widgetViewModel: WidgetContainerViewModel);
}
class FilterViewModel extends ControlViewModel {
    private _filter;
    Dimension: KnockoutObservable<Dimension>;
    DimensionValuesIntermediary: KnockoutObservableArray<DimensionValue>;
    DimensionValueOptions: KnockoutObservableArray<DimensionValue>;
    DimensionValueCodes: KnockoutComputed<string[] | string>;
    IsLoaded: KnockoutObservable<boolean>;
    constructor(_filter: Dashboards.Filter, widgetViewModel: WidgetContainerViewModel);
    UpdateValues(): Q.Promise<DimensionValue[]>;
    private UpdateFilter(filter, newDims);
    private GetDimensionValuesFromCodes(codes);
}
class WidgetSettingsViewModel {
    OriginalWidgetSettings: Providers.WidgetDataProvider.WidgetSettings;
    WidgetWidthColumns: KnockoutObservable<number>;
    CustomCSS: KnockoutObservable<string>;
    constructor(OriginalWidgetSettings: Providers.WidgetDataProvider.WidgetSettings);
}

}