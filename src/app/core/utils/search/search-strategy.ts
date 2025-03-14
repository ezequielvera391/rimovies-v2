export interface SearchStrategy {
  search(data: any[], searchTerm: string): any[];
}

export class ObjectSearchStrategy implements SearchStrategy {
  constructor(private key: string) {}

  search(data: any[], searchTerm: string): any[] {
    return data.filter(item => {
      const value = item[this.key];
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}

export class PrimitiveSearchStrategy implements SearchStrategy {
  search(data: (string | number)[], searchTerm: string): (string | number)[] {
    return data.filter(item => item.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  }
}

export class MultiKeyObjectSearchStrategy implements SearchStrategy {
  constructor(private keysToSearch: string[]) {}

  search(data: any[], searchTerm: string): any[] {
    if (!searchTerm.trim()) return data;

    const lowerCaseTerm = searchTerm.toLowerCase();

    return data.filter(item =>
      this.keysToSearch.some(key => {
        const value = this.extractValue(item, key);
        
        if (Array.isArray(value)) {
          return value.some(val =>
            this.includesSearchTerm(val, lowerCaseTerm)
          );
        }
        
        return this.includesSearchTerm(value, lowerCaseTerm);
      })
    );
  }

  private extractValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => {
      if (Array.isArray(acc)) {
        return acc.map(item => item[part]).filter(val => val !== undefined);
      }
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  }

  private includesSearchTerm(value: any, searchTerm: string): boolean {
    if (Array.isArray(value)) {
      return value.some(val => this.includesSearchTerm(val, searchTerm));
    }
    return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
  }
}

// Clase que gestiona la estrategia
export class SearchContext {
  private strategy: SearchStrategy;

  constructor(strategy: SearchStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SearchStrategy) {
    this.strategy = strategy;
  }

  executeSearch(data: any[], searchTerm: string): any[] {
    return this.strategy.search(data, searchTerm);
  }
}