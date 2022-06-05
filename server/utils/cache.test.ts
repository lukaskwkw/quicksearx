import { cache } from './cache';

describe('Cache', () => {
  let instances = cache();

  beforeEach(() => {
    instances = cache();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should correctly initialize the cache', () => {
    expect(instances.TTL).toEqual(3600000);
    expect(instances._instances).toEqual('REFRESH');
    expect(instances.data).toEqual('REFRESH');
    expect(instances._time).toEqual(0);
  });

  it('Should correctly set the cache', () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    const instancesCustom = cache(20000)
    instancesCustom.data = 'SpaceInstancesData';
    expect(instancesCustom.TTL).toEqual(20000);
    expect(instancesCustom._instances).toEqual('SpaceInstancesData');
    expect(instancesCustom._time).toEqual(1000);
  });

  it('Should get REFRESH when time passed TTL', () => {
    jest.spyOn(Date, 'now').mockReturnValueOnce(1000);
    instances.data = 'SpaceInstancesData';
    jest.spyOn(Date, 'now').mockReturnValueOnce(3800 * 1000);
    expect(instances.data).toEqual('REFRESH');
  });

  it('Should get SpaceInstancesData when time not passed TTL', () => {
    jest.spyOn(Date, 'now').mockReturnValueOnce(1000);
    instances.data = 'SpaceInstancesData';
    jest.spyOn(Date, 'now').mockReturnValueOnce(10000);
    expect(instances.data).toEqual('SpaceInstancesData');
  });
});
