import { computeDomain } from 'custom-card-helpers';
import { Domain, SliderButtonCardConfig } from '../types';
import { Controller } from './controller';
import { CoverController } from './cover-controller';
import { FanController } from './fan-controller';
import { LightController } from './light-controller';
import { SwitchController } from './switch-controller';

export class ControllerFactory {
  static getInstance(config: SliderButtonCardConfig): Controller {
    const domain = computeDomain(config.entity);
    const mapping = {
      [Domain.LIGHT]: LightController,
      [Domain.FAN]: FanController,
      [Domain.SWITCH]: SwitchController,
      [Domain.COVER]: CoverController,
    };
    if (typeof mapping[domain] === 'undefined') {
      throw new Error(`Unsupported entity type: ${domain}`)
    }
    return new mapping[domain](config);
  }
}