using System.Runtime.InteropServices;
using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<BaseActivityDTO, Activity>();
        CreateMap<Attendee, AttendeeProfileDto>()
              .ForMember(a => a.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
              .ForMember(a => a.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
              .ForMember(a => a.Bio, opt => opt.MapFrom(src => src.AppUser.Bio))
              ;
        CreateMap<Activity, GetActivityDto>()
        .ForMember(a => a.HostUserName, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(att => att.IsHost)!.AppUser.UserName));
        CreateMap<Activity, Activity>().ForMember(dst => dst.Id, opts => opts.Ignore());
        CreateMap<CreateActivityDto, Activity>();

        CreateMap<EditActivityDto, Activity>();

    }
}