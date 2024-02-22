import Axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import AdminConfigAppDto from '#app/api/admin/config/app/dto';
import AdminConfigMenuDto from '#app/api/admin/config/menu/dto';
import { ResponseEntity } from '@seung-ju/next/client';
import AuthSignupDto from '#app/api/auth/signup/dto';

namespace Api {
  export const axios = Axios.create({});

  export namespace Auth {
    export namespace Signup {
      export namespace Fetch {
        export function signup(request: AuthSignupDto.SignupRequest) {
          return axios.post<
            ResponseEntity<AuthSignupDto.SignupResponse>,
            AxiosResponse<ResponseEntity<AuthSignupDto.SignupResponse>>,
            AuthSignupDto.SignupRequest
          >('/api/auth/signup', request);
        }
      }

      export namespace Mutation {
        export function useSignupMutation() {
          return useMutation<
            AxiosResponse<ResponseEntity<AuthSignupDto.SignupResponse>>,
            AxiosError<ResponseEntity<{ message: string }>>,
            AuthSignupDto.SignupRequest
          >({
            mutationFn(request: AuthSignupDto.SignupRequest) {
              return Fetch.signup(request);
            },
          });
        }
      }
    }
  }

  export namespace Admin {
    export namespace Config {
      export namespace App {
        export namespace Fetch {
          export function save(request: AdminConfigAppDto.SaveRequest) {
            return axios.post<
              ResponseEntity<AdminConfigAppDto.SaveResponse>,
              AxiosResponse<ResponseEntity<AdminConfigAppDto.SaveResponse>>,
              AdminConfigAppDto.SaveRequest
            >('/api/admin/config/app', request);
          }
        }

        export namespace Mutation {
          export function useSaveMutation() {
            return useMutation<
              AxiosResponse<ResponseEntity<AdminConfigAppDto.SaveResponse>>,
              AxiosError<ResponseEntity<{ message: string }>>,
              AdminConfigAppDto.SaveRequest
            >({
              mutationFn(request: AdminConfigAppDto.SaveRequest) {
                return Fetch.save(request);
              },
            });
          }
        }
      }

      export namespace Menu {
        export namespace Fetch {
          export function save(request: AdminConfigMenuDto.SaveRequest) {
            return axios.post<
              ResponseEntity<AdminConfigMenuDto.SaveResponse>,
              AxiosResponse<ResponseEntity<AdminConfigMenuDto.SaveResponse>>,
              AdminConfigMenuDto.SaveRequest
            >('/api/admin/config/menu', request);
          }
        }

        export namespace Mutation {
          export function useSaveMutation() {
            return useMutation<
              AxiosResponse<ResponseEntity<AdminConfigMenuDto.SaveResponse>>,
              AxiosError<ResponseEntity<{ message: string }>>,
              AdminConfigMenuDto.SaveRequest
            >({
              mutationFn(request: AdminConfigMenuDto.SaveRequest) {
                return Fetch.save(request);
              },
            });
          }
        }
      }
    }
  }

  export namespace Files {}
}

export default Api;
